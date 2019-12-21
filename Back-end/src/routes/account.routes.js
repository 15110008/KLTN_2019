import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import AccountController from '../modules/account-module/controllers/account.controller';
import AccountValidate from '../modules/account-module/middleware/account.middleware';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // console.log(file);
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

// send mail for admin
// Nodemailer
router.post('/send-mail', (req, res) => {
  // Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
  const transporter = nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'Testnodemailer97@gmail.com', // Tài khoản gmail vừa tạo
      pass: 'nguyenphuc97' // Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Testnodemailer97@gmail.com',
    to: 'nguyenngochoangphuc0311@gmail.com',
    subject: req.body.Title,
    // subject: 'Test trước xem ntn',
    text: 'Nội dung nè',
    // text: req.body.Content,
    html: `<p>Được gửi bởi: ${req.body.name}</p>
    <br/>
    <br/>
    <br/>
    <div>${req.body.Content}</div>
    `
  };
  transporter.sendMail(mainOptions, (err) => {
    if (err) {
      // console.log(err);
      res.send('Gửi mail không thành công!');
    } else {
      // console.log('Message sent: ' + info.response);
      res.send('Gửi thành công!');
    }
  });
});


// Create use routers
// POST
// Create account
router.post('/account', AccountValidate.createAccountInput, AccountController.create);
// login account
router.post('/account/login', AccountValidate.logInAccountInput, AccountController.login);
// login with facebook
router.post('/account/login/facebook', AccountValidate.loginWithFacebookInput, AccountValidate.reduceInput, AccountController.loginWithFacebook);
// login with google
router.post('/account/login/google', AccountValidate.loginWithGoogleInput, AccountValidate.reduceInput, AccountController.loginWithGoogle);
// upload avatar
router.post('/account/upload', upload.single('avatar'), AccountValidate.upload, AccountController.uploadImage);


// GET
// lấy thông tin của chính bản thân
router.get('/account/me', AccountValidate.meInput, AccountController.me);
// lấy danh sách account trong hệ thống (by admin)
router.get('/accounts', AccountValidate.getAccountsInput, AccountController.getAccounts);
// lấy thông tin của 1 account bất kì trong hệ thống
router.get('/account/:id', AccountValidate.getAccountInput, AccountController.getAccount);

// PUT
// admin change account info
router.put('/account/:id', AccountValidate.updateAccount1Input, AccountValidate.reduceInput, AccountController.updateAccount);
// user thay đổi thông tin của account (name, phone)
router.put('/account', AccountValidate.updateAccountInput, AccountValidate.reduceInput, AccountController.updateInfo);
// thay đổi password của account khi đã đăng nhập vào
router.put('/account/changepassword', AccountValidate.changePasswordInput, AccountController.changePassword);
// block-unblock account đối với các bài viết (by admin)
router.put('/account/block-unblock/:id', AccountValidate.blockUnblockAccountInput, AccountController.blockUnblockAccount);


// DELETE
router.delete('/account/:id', AccountValidate.deleteAccountInput, AccountController.deleteAccount);

export default router;
