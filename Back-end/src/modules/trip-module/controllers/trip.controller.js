// import { rootCertificates } from 'tls';
// import _ from 'lodash';
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
    CreateTripDetailErrors,
    GetTripPublicErrors,
    GetTripDetailErrors,
    GetTripUnPublicErrors,
    ShareTripErrors,
    UpdateTripDetailErrors,
    UpdateListSpotErrors
} from '../error-codes/trip.error-codes';

const createTrip = async (req, res) => {
    const { jwt } = req.headers;
    const {
        fromDes,
        toDes,
        totalDate,
        destinationId
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateTripErrors.AUTH_FAIL);
        const { accountId } = authenData;
        const isExisted = await DestinationRepository.getDestination(destinationId);
        if (!isExisted) throw new AlreadyExistError(CreateTripErrors.DESTINATION_NEVER_EXIST);
        const name = 'Lịch trình ' + totalDate + ' ngày từ ' + fromDes + ' đến ' + toDes;
        // console.log(name);
        const trip = await TripRepository.createTrip({
            name,
            totalDate,
            destinationId,
            accountId
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

        // const _listName = [];
        // listName.map((x) => {
        //     _listName.push(x.id);
        // });
        // const _oldList = [];
        // if (!_.isEmpty(oldList)) {
        //     oldList.map((x) => {
        //         _oldList.push(x.id);
        //     });
        // }
        await Promise.all(listName);
        // lấy danh sách địa điểm đầy đủ trừ danh sách địa điểm đã đi ở ngày trước
        // lấy danh sách trong db trừ danh sách input
        const oldList1 = oldList.map((old) => {
            const { id } = old;
            return id;
        });
        await Promise.all(oldList1);
        // console.log(oldList1);
        const listName1 = listName.map((lis) => {
            const { id } = lis;
            return id;
        });
        await Promise.all(listName1);
        // console.log(listName1);
        const subList1 = listName1.filter(y => !oldList1.includes(y));
        // console.log(subList1);
        const subList = [];
        subList1.map((x) => {
            listName.map((y) => {
                if (x === y.id) {
                    subList.push({
                        id: y.id,
                        name: y.name
                    });
                }
                return y;
            });
            return x;
        });
        // console.log(subList);
        // const _subList = _.difference(_listName, _oldList);
        // const subList = [];
        // _subList.map((x) => {
        //     listName.map((y) => {
        //         if (x === y.id) {
        //             subList.push({
        //                 id: y.id,
        //                 name: y.name
        //             });
        //         }
        //     });
        // });

        // console.log(subList);

        // lấy ra các địa điểm trong danh sách đã được trừ
        const liNa = [];
        const liName = max.map(() => {
            liNa.push(subList[Math.floor(Math.random() * subList.length)]);
            return liNa;
        });
        await Promise.all(liName);
        const x = liName[0];
        const listPl = x.filter((item, index) => x.indexOf(item) === index); // danh sách kết quả của ngày đang tạo


        // tổng số địa điểm trong 1 ngày
        const totalPlaces = listPl.length;
        // cập nhật danh sách oldList
        // const OldList = oldList.concat(listPlaces);
        // console.log(OldList);
        // // danh sách tên các địa điểm trong ngày
        // const listPlaces = listIdName.map((liN) => {
        //     const { name } = liN;
        //     return name;
        // });
        // await Promise.all(listPlaces);
        // danh sách id các địa điểm trong ngày
        const listID = listPl.map((liID) => {
            const { id } = liID;
            return id;
        });
        await Promise.all(listID);
        console.log(listID);
        const listIm = listID.map(async (Id) => {
            const im = await PlaceRepository.getPlace(Id);
            const { id } = im;
            const { name } = im;
            const { images } = im;
            const image = images[0];
            return { id, name, image };
        });
        const listPlaces = await Promise.all(listIm);
        console.log(listPlaces);
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
        let display = 0;
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
        //     display += 1;
        //     return {
        //         display,
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
            display += 1;
            const b = {
                display,
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
        return res.onSuccess(tripDetail, listPl);
    } catch (error) {
        return res.onError(error);
    }
};
const getTripPublic = async (req, res) => {
    try {
        const trip = await TripRepository.getTripPublic();
        if (!trip) throw new NotImplementError(GetTripPublicErrors.GET_TRIP_FAIL);
        const result = trip.map((tr) => {
            const tripInfo = {};
            tripInfo._id = tr._id;
            tripInfo.name = tr.name;
            tripInfo.totalDate = tr.totalDate;
            tripInfo.destinationId = tr.destinationId;
            tripInfo.accountId = tr.accountId;
            tripInfo.rate = tr.rate;
            return tripInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};

const getTripUnPublic = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetTripUnPublicErrors.AUTH_FAIL);
        const { accountId } = authenData;
        const trip = await TripRepository.getTripUnPublic(accountId);
        if (!trip) throw new NotFoundError(GetTripUnPublicErrors.GET_TRIP_FAILURE);
        const result = trip.map((tr) => {
            const tripInfo = {};
            tripInfo._id = tr._id;
            tripInfo.name = tr.name;
            tripInfo.totalDate = tr.totalDate;
            tripInfo.destinationId = tr.destinationId;
            tripInfo.accountId = tr.accountId;
            tripInfo.rate = tr.rate;
            return tripInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};

const getTripDetail = async (req, res) => {
    const tripId = req.params.id;
    try {
        const Trip = await TripRepository.getTripById(tripId);
        if (!Trip) throw new NotFoundError(GetTripDetailErrors.GET_TRIP_FAILURE);
        const tripDetail = await TripRepository.getTripsDetail(tripId);
        if (!tripDetail) throw new NotFoundError(GetTripDetailErrors.GET_TRIP_DETAIL_FAILURE);
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
        return res.onSuccess(Trip, result);
    } catch (error) {
        return res.onError(error);
    }
};

const shareTrip = async (req, res) => {
    // const { jwt } = req.headers;
    const tripId = req.params.id;
    try {
        // const authenData = VerifyToken(jwt);
        // if(!authenData) throw new NotImplementError(ShareTripErrors.AUTH_FAIL);
        const result = await TripRepository.shareTrip(tripId);
        if (!result) throw new NotImplementError(ShareTripErrors.UPDATE_FAILURE);
        const trip = await TripRepository.getTripById(tripId);
        if (!trip) throw new NotFoundError(ShareTripErrors.GET_FAILURE);
        return res.onSuccess(trip);
    } catch (error) {
        return res.onError(error);
    }
};

const updateTripDetail = async (req, res) => {
    const tripDetailId = req.params.id;
    const { listPlaces } = req.body; // chỉ gồm 2 thuộc tính là { id, name };
    try {
        const tripDetail = await TripRepository.getTripDetail(tripDetailId);
        if (!tripDetail) throw new NotFoundError(UpdateTripDetailErrors.TRIP_DETAIL_NEVER_EXIST);
        // tổng số địa điểm
        const totalPlaces = listPlaces.length;
        // update totalPlaces trong trip detail
        const update = await TripRepository.updateTotalPlaces(tripDetailId, totalPlaces);
        if (!update) throw new NotImplementError(UpdateTripDetailErrors.UPDATE_TOTAL_PLACES_FAILURE);
        //lọc id ra 
        const listID = listPlaces.map((liID) => {
            const { id } = liID;
            return id;
        });
        await Promise.all(listID);
        //tạo mảng chứa từng cặp id ứng với spotId trong bảng spot
        const liSpot = [];
        for (let i = 0; i < listID.length - 1; i += 1) {
            liSpot.push([listID[i], listID[i + 1]]);
        }
        //lấy thời gian di chuyển từ bảng spot
        const rs = liSpot.map(async (spotId) => {
            // console.log(spotId)
            const spot = await SpotRepository.getSpot(spotId);
            if (!spot) throw new NotImplementError(UpdateTripDetailErrors.GET_SPOT_FAILURE);
            const { length } = spot;
            const { time } = spot;
            const spotTime = time;
            return { length, spotTime };
        });
        const result = await Promise.all(rs);
        // console.log(listPlaces);
        // console.log(result);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateListSpot = async (req, res) => {
    const tripDetailId = req.params.id;
    const { listSpot } = req.body;
    try {
        const tripDetail = await TripRepository.getTripDetail(tripDetailId);
        if (!tripDetail) throw new NotFoundError(UpdateListSpotErrors.TRIP_DETAIL_NEVER_EXIST);
        const update = await TripRepository.updateListSpot(tripDetailId, listSpot);
        if(!update) throw new NotImplementError(UpdateListSpotErrors.UPDATE_FAILURE);
        const result = await TripRepository.getTripDetail(tripDetailId);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
}
export default {
    createTrip,
    getTripPublic,
    getTripUnPublic,
    createTripDetail,
    getTripDetail,
    shareTrip,
    updateTripDetail,
    updateListSpot
};