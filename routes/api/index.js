const express = require('express');
const getProvince = require('../../modules/getProvince');
const router = express.Router();

router.get('/', (req, res) => {
    // getProvince.getProvince()
    res.json({
        name: 'zc'
    })
})
router.get('/getProvince', (req, res) => {
    getProvince.getProvince('http://apis.map.qq.com/ws/district/v1/getchildren?key=WJJBZ-W64HU-472VU-2XGIA-U2LNZ-ENBI7')
    .then((data) => {
        console.log(res)
        res.json(data.result[0])
    })
})
module.exports = router;