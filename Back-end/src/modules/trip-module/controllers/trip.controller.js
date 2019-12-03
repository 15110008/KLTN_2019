// import { rootCertificates } from 'tls';
import _ from 'lodash';
import { VerifyToken } from '../../../utils/jwt.util';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import DestinationRepository from '../../destination-module/repositories/destination.repository';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import PlaceRepository from '../../place-module/repositories/place.repository';
import SpotRepository from '../../spot-module/repositories/spot.repository';
import TripRepository from '../repositories/trip.repository';

import {
    CreateTripErrors,
    CreateTripDetailErrors
} from '../error-codes/trip.error-codes';

const createTrip = async (req, res) => {
    const { jwt } = req.headers;
    const {
        fromDes,
        toDes,
        totalDate,
        destinationId
    } = req.body;
    console.log(req.body);
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateTripErrors.AUTH_FAIL);
        const isExisted = await DestinationRepository.getDestination(destinationId);
        if (!isExisted) throw new AlreadyExistError(CreateTripErrors.DESTINATION_NEVER_EXIST);
        const name = 'Lịch trình ' + totalDate + ' ngày từ ' + fromDes + ' đến ' + toDes;
        // console.log(name);
        const trip = await TripRepository.createTrip({
            name,
            totalDate,
            destinationId
        });
        if (!trip) throw new NotImplementError(CreateTripErrors.CREATE_FAIL);
        return res.onSuccess(trip);
    } catch (error) {
        return res.onError(error);
    }
};

const createTripDetail = async (req, res) => {
    const { jwt } = req.headers;
    const {
        date,
        day,
        oldList,
        hobbies,
        destinationId,
        tripId
    } = req.body;
    const max = [1, 2, 3, 4, 5, 6]; // cho tối đa 6 địa điểm trong 1 ngày
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateTripDetailErrors.AUTH_FAIL);
        const list = await PlaceRepository.getListWithHobbies(destinationId, hobbies); // get danh sách theo hobbies
        if (!list) throw new NotFoundError(CreateTripDetailErrors.GET_LIST_PLACE_FAILURE);
        // danh sách địa điểm đầy đủ trong db
        const listName = list.map((li) => {
            const { id } = li;
            const { name } = li;
            return { id, name };
        });

        let _listName = []
        listName.map(x => {
            _listName.push(x.id)
        })
        let _oldList = []
        if (!_.isEmpty(oldList)) {
            oldList.map(x => {
                _oldList.push(x.id)
            })
        }
        await Promise.all(listName);
        // lấy danh sách địa điểm đầy đủ trừ danh sách địa điểm đã đi ở ngày trước
        // lấy danh sách trong db trừ danh sách input
        // const subList = listName.filter(i => !oldList.includes(i.id));
        const _subList = _.difference(_listName, _oldList);
        const subList = []
        _subList.map(x => {
            listName.map(y => {
                if (x == y.id) {
                    subList.push({
                        id: y.id,
                        name: y.name
                    })
                }
            })
        })

        // console.log(subList);

        // lấy ra các địa điểm trong danh sách đã được trừ
        const liNa = [];
        const liName = max.map(() => {
            liNa.push(subList[Math.floor(Math.random() * subList.length)]);
            return liNa;
        });
        await Promise.all(liName);
        const x = liName[0];
        const listPlaces = x.filter((item, index) => x.indexOf(item) === index); // danh sách kết quả của ngày đang tạo
        // tổng số địa điểm trong 1 ngày
        const totalPlaces = listPlaces.length;
        // cập nhật danh sách oldList
        const OldList = oldList.concat(listPlaces);
        // console.log(OldList);
        // // danh sách tên các địa điểm trong ngày
        // const listPlaces = listIdName.map((liN) => {
        //     const { name } = liN;
        //     return name;
        // });
        // await Promise.all(listPlaces);
        // danh sách id các địa điểm trong ngày
        const listID = listPlaces.map((liID) => {
            const { id } = liID;
            return id;
        });
        await Promise.all(listID);
        // console.log(listID);
        // danh sách các cặp địa điểm trong ngày
        const liSpot = [];
        for (let i = 0; i < listID.length - 1; i += 1) {
            liSpot.push([listID[i], listID[i + 1]]);
        }
        // console.log(liSpot);
        // tạo danh sách đường đi

        const listSpot = [];
        let Time = 510;
        let spotTime = 0;
        let stayTime = 0;
        // let index = 0;
        // const a = liSpot.map(async (sp) => {
        //     const spot = await SpotRepository.getSpot(sp);
        //     if (!spot) throw new NotFoundError(CreateTripDetailErrors.GET_SPOT_FAIL);
        //     console.log(sp);
        //     const spotId = sp;
        //     const { length } = spot;
        //     const { time } = spot;
        //     spotTime = time;
        //     // console.log(index)
        //     if (spotTime < 30) {
        //         stayTime = 120;
        //     } else {
        //         stayTime = 100;
        //     }
        //     if (index === 0) {
        //         Time = 510;
        //         index += 1;
        //     } else {
        //         Time = Time + spotTime + stayTime;
        //         index += 1;
        //     }
        //     // console.log(Time);
        //     const hours = Math.floor(Time / 60);
        //     const minutes = Time % 60;
        //     const startTime = hours + ':' + minutes;
        //     // console.log(startTime);
        //     return {
        //         startTime,
        //         spotId,
        //         length,
        //         spotTime,
        //         stayTime
        //     };
        // });
        // const listSpot = await Promise.all(a);

        for (let i = 0; i < liSpot.length; i += 1) {
            Time = Time + spotTime + stayTime;
            const hours = Math.floor(Time / 60);
            const minutes = Time % 60;
            const startTime = hours + ':' + minutes;
            const spot = await SpotRepository.getSpot(liSpot[i]);
            if (!spot) throw new NotFoundError(CreateTripDetailErrors.GET_SPOT_FAIL);
            const spotId = liSpot[i];
            // console.log(spotId);
            const { length } = spot;
            const { time } = spot;
            spotTime = time;
            if (spotTime < 30) {
                stayTime = 120;
            } else {
                stayTime = 100;
            }
            const b = {
                startTime,
                spotId,
                length,
                spotTime,
                stayTime
            };
            listSpot.push(b);
        }
        // console.log(day);
        // console.log(date);
        // console.log(totalPlaces);
        // console.log(listPlaces);
        // console.log(listSpot);
        const tripDetail = await TripRepository.createTripDetail({
            date,
            day,
            totalPlaces,
            listPlaces,
            listSpot,
            tripId,
            destinationId
        });
        if (!tripDetail) throw new NotImplementError(CreateTripDetailErrors.CREATE_FAILURE);
        return res.onSuccess(tripDetail, OldList);
    } catch (error) {
        return res.onError(error);
    }
};
const getTripDetail = async (req, res) => {
    try {
        const tripDetail = await TripRepository.getTripDetail();
        const result = tripDetail.map((trip) => {
            const tripDetailInfo = {};
            tripDetailInfo._id = trip._id;
            tripDetailInfo.date = trip.date;
            tripDetailInfo.day = trip.day;
            tripDetailInfo.totalPlaces = trip.totalPlaces;
            tripDetailInfo.listPlaces = trip.listPlaces;
            tripDetailInfo.listSpot = trip.listSpot;
            tripDetailInfo.destinationId = trip.destinationId;
            tripDetailInfo.tripId = trip.tripId;
            return tripDetailInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};

// k thay van de gi sao k thay bi gi ta thua tét tiep vai lan coi
export default {
    createTrip,
    createTripDetail,
    getTripDetail
};