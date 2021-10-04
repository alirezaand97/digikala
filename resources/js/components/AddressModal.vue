<template>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="address_modal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">جزییات آدرس</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="map_container">
                        <span class="digi_label"> موقعیت خود را روی نقشه انتخاب کنید</span>
                        <mapir :center="center" :apiKey="apiKey">
                            <mapMarker
                                :coordinates.sync="markerCoordinates"
                                color="red"
                                @click="markerOnClick"
                                :draggable="true"
                                @dragend="getlatLng"
                            />
                            <mapNavigationControl position="top-left"/>
                            <mapGeolocateControl position="top-left"/>
                        </mapir>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label">استان *</label>
                                <select v-model="province_id" v-on:change="get_cities" class="selectpicker digi_input digi_select_input "
                                        id="province_select" data-live-search="true">
                                    <option v-for="(province,key) in provinces" v-bind:value="province.id" v-bind:key="key">{{province.name}}
                                    </option>
                                </select>
                                <span class="error" v-if="province_id_error">{{province_id_error}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label">شهر *</label>
                                <select v-model="city_id" class="selectpicker digi_input digi_select_input" id="cities_select"
                                        data-live-search="true">
                                    <option v-for="(city,key2) in cities" v-bind:key="key2" v-bind:value="city.id">{{city.name}}
                                    </option>
                                </select>
                                <span class="error" v-if="city_id_error">{{city_id_error}}</span>

                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="dg_input_div">
                                <label class="digi_label">نشانی پستی *</label>
                                <textarea type="text" v-model="post_address" name="mobile"
                                          class="digi_input"></textarea>
                                <span class="error" v-if="post_address_error">{{post_address_error}}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="dg_input_div">
                                <label class="digi_label">پلاک *</label>
                                <input type="text" v-model="plaque" name="mobile" class="digi_input">
                                <span class="error" v-if="plaque_error">{{plaque_error}}</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="dg_input_div">
                                <label class="digi_label"> واحد *</label>
                                <input type="text" v-model="unit" name="mobile" class="digi_input">
                                <span class="error" v-if="unit_error">{{unit_error}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label"> کد پستی *</label>
                                <input type="text" v-model="post_code" name="mobile" class="digi_input">
                                <span class="error" v-if="post_code_error">{{post_code_error}}</span>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label">نام و نام خانوادگی *</label>
                                <input type="text" v-model="name" name="mobile" class="digi_input">
                                <span class="error" v-if="name_error">{{name_error}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label">کد ملی *</label>
                                <input type="text" v-model="national_code" name="mobile" class="digi_input">
                                <span class="error" v-if="national_code_error">{{national_code_error}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dg_input_div">
                                <label class="digi_label">شماره موبایل *</label>
                                <input type="text" v-model="mobile" name="mobile" class="digi_input">
                                <span class="error" v-if="mobile_error">{{mobile_error}}</span>
                            </div>
                        </div>

                        <div class="col-12 d-flex justify-content-end">
                            <span class="auth_button" id="register_submit"
                                  v-on:click="add_address">تایید و ثبت آدرس</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapir,
        mapNavigationControl,
        mapGeolocateControl,
        mapScaleControl,
        mapMarker
    } from "mapir-vue";

    export default {
        name: "AddressModal",
        mounted() {
            this.get_provinces();
            $("#address_modal").modal('hide');
        },
        components: {
            mapir,
            mapNavigationControl,
            mapGeolocateControl,
            mapScaleControl,
            mapMarker

        },
        data() {
            return {
                apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiOWM4ZThkZTA4ZmY3ZmYzZjg1YWY0ZTFmM2E2M2ViY2UzMTQzMmRjZWQ4YWFlOGUxZTZkZGNmNWU2NTI2OTYzY2JhYzM1Mjk1OTlmN2FjIn0.eyJhdWQiOiIxMDg3OCIsImp0aSI6ImNiOWM4ZThkZTA4ZmY3ZmYzZjg1YWY0ZTFmM2E2M2ViY2UzMTQzMmRjZWQ4YWFlOGUxZTZkZGNmNWU2NTI2OTYzY2JhYzM1Mjk1OTlmN2FjIiwiaWF0IjoxNjAwMzIwNTE2LCJuYmYiOjE2MDAzMjA1MTYsImV4cCI6MTYwMzAwMjUxNiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.ktUfeaebrx4edLx5OEyvpe-kvs53hepiCa0chhxUEp5UOoP01WaTj9RRTA6STid6y7-W4lwX03II4S0ieF2hlqrTd_i4T451MeGaEf5F3pW-T_E5QnNWh4_Zzg9zFOAa5ZdV-DZ8v6vYnfknEHuEpvz3czrgMuP0i76OEmA3Mg4vdXuq4lpBSA8iDGF53wdI2Vu_A7zHdpciOhdY8JbZ4fFeHfTuk_SOMV584sDH6FRV3xdD43ucZn_ZAjgD5B1sb5dK4c4KtpUO_0whjltpBIX2KvUAmsyhMgRro_v_F0BPiLTJRCHMMpLtEhN9YpoutMCAKuwYprVD59J4KMSrng',
                center: [51.420296, 35.732379],
                markerCoordinates: [51.420296, 35.732379],
                provinces: [],
                cities: [],
                province_id: '',
                city_id: '',
                mobile: '',
                post_address: '',
                plaque: '',
                unit: '',
                post_code: '',
                name: '',
                national_code: '',
                lat: '',
                lng: '',
                province_id_error: '',
                city_id_error: '',
                mobile_error: '',
                post_address_error: '',
                plaque_error: '',
                unit_error: '',
                post_code_error: '',
                name_error: '',
                national_code_error: '',
                lat_error: '',
                isUpdate: false,
                id: ''
            }
        },
        methods: {
            updateAddress: function (address, isUpdate) {
                this.province_id = address.province_id;
                this.city_id = address.city_id;
                this.mobile = address.mobile;
                this.post_address = address.post_address;
                this.plaque = address.plaque;
                this.unit = address.unit;
                this.post_code = address.post_code;
                this.name = address.name;
                this.national_code = address.national_code;
                this.lat = address.lat;
                this.lng = address.lng;
                this.center = [this.lng, this.lat];
                this.markerCoordinates = [this.lng, this.lat];
                this.id = address.id;
                this.get_provinces();
                this.get_cities();
                this.isUpdate = isUpdate;
                $("#address_modal").modal('show');
            },
            markerOnClick: function (e) {
                this.lng = e.marker._lngLat.lng;
                this.lat = e.marker._lngLat.lat;
            },
            getlatLng: function (e) {
                this.lng = e.actualEvent.target._lngLat.lng;
                this.lat = e.actualEvent.target._lngLat.lat;
            },
            get_provinces: function () {
                let url = this.$siteUrl + 'api/get-provinces';
                this.axios.get(url).then(response => {
                    this.provinces = response.data;
                    setTimeout(function () {
                        $("#province_select").selectpicker('refresh');
                    }, 200)
                })
            },
            get_cities: function () {
                let url = this.$siteUrl + 'api/get-cities?province_id=' + this.province_id;
                this.axios.get(url).then(response => {
                    this.cities = response.data;
                    setTimeout(function () {
                        $("#cities_select").selectpicker('refresh');
                    }, 200);
                })
            },
            add_address: function () {
                let validated = this.inputsAreValid();
                if (validated) {
                    let addressData = new FormData();
                    addressData.append('province_id', this.province_id);
                    addressData.append('city_id', this.city_id);
                    addressData.append('mobile', this.mobile);
                    addressData.append('post_address', this.post_address);
                    addressData.append('plaque', this.plaque);
                    addressData.append('unit', this.unit);
                    addressData.append('post_code', this.post_code);
                    addressData.append('name', this.name);
                    addressData.append('national_code', this.national_code);
                    addressData.append('lat', this.lat);
                    addressData.append('lng', this.lng);
                    addressData.append('is_selected', 1);
                    let url='';
                    if (this.isUpdate==true) {
                         url = this.$siteUrl + 'user/address/update?id=' + this.id;
                    } else {
                         url = this.$siteUrl + 'user/address/add';
                    }
                    this.axios.post(url, addressData).then(response => {
                        this.$emit('addNewAddress', response.data);
                        $("#address_modal").modal('hide');
                        this.province_id = '';
                        this.city_id = '';
                        this.mobile = '';
                        this.post_address = '';
                        this.plaque = '';
                        this.unit = '';
                        this.post_code = '';
                        this.name = '';
                        this.national_code = '';
                        this.lat = '';
                        this.lng = '';
                        this.center = '';
                        this.markerCoordinates = '';
                        this.id = '';
                    })
                }
            },
            inputsAreValid: function () {
                let mobileValidation = this.validate_mobile();
                let nationalCodeValidation = this.validate_numeric_input('national_code');
                let unitValidation = this.validate_numeric_input('unit');
                let plaqueValidation = this.validate_numeric_input('plaque');
                let postCodeValidation = this.validate_numeric_input('post_code');
                let provinceIdValidation = this.validate_required('province_id');
                let cityIdValidation = this.validate_required('city_id');
                let nameValidation = this.validate_required('name');
                let postAddressValidation = this.validate_required('post_address');
                if (mobileValidation, nationalCodeValidation, unitValidation, plaqueValidation, postCodeValidation, provinceIdValidation, cityIdValidation, nameValidation, postAddressValidation) {
                    return true;
                } else {
                    return false;
                }
            },
            validate_mobile: function () {
                let mobileReg = new RegExp(/^(\+?98|0098|98|0)9\d{9}$/);
                let isValid = mobileReg.test(this.mobile);
                if (isValid) {
                    this.mobile_error = '';
                    return true;
                } else {
                    this.mobile_error = 'لطفا شماره موبایل معتبر وارد کنید';
                    return false;
                }
            },
            validate_numeric_input: function (input) {
                let reg = new RegExp(/^\d{1,30}$/);
                switch (input) {
                    case 'national_code':
                        let isValidnational = reg.test(this.national_code);
                        if (isValidnational) {
                            this.national_code_error = '';
                            return true;
                        } else {
                            this.national_code_error = 'کد ملی را باید عددی وارد کنید';
                            return false;
                        }
                    case 'unit':
                        let isValidUnit = reg.test(this.unit);
                        if (isValidUnit) {
                            this.unit_error = '';
                            return true;
                        } else {
                            this.unit_error = 'واحد را باید عددی وارد کنید';
                            return false;
                        }

                    case 'plaque':
                        let isValidPlaque = reg.test(this.plaque);
                        if (isValidPlaque) {
                            this.plaque_error = '';
                            return true;
                        } else {
                            this.plaque_error = 'شماره پلاک را باید عددی وارد کنید';
                            return false;
                        }
                    case 'post_code':
                        let isValidPostCode = reg.test(this.post_code);
                        if (isValidPostCode) {
                            this.post_code_error = '';
                            return true;
                        } else {
                            this.post_code_error = 'کد پستی را باید عددی وارد کنید';
                            return false;
                        }
                }

            },
            validate_required: function (input) {
                let reg = new RegExp(/^[a-zA-Z0-9-,_.\u0600-\u06FF\s]+$/);
                switch (input) {
                    case 'post_address':
                        let isValidAddress = reg.test(this.post_address);
                        if (isValidAddress) {
                            this.post_address_error = '';
                            return true;
                        } else {
                            this.post_address_error = 'آدرس پستی نمی تواند خالی باشد';
                            return false;
                        }
                    case 'name':
                        let isValidName = reg.test(this.name);
                        if (isValidName) {
                            this.name_error = '';
                            return true;
                        } else {
                            this.name_error = 'نام و نام خانوادگی نمی تواند نمی تواند خالی باشد';
                            return false;
                        }

                    case 'province_id':
                        let isValidProvince = reg.test(this.province_id);
                        if (isValidProvince) {
                            this.province_id_error = '';
                            return true;
                        } else {
                            this.province_id_error = 'استان نمی تواند خالی باشد';
                            return false;
                        }
                    case 'city_id':
                        let isValidCity = reg.test(this.city_id);
                        if (isValidCity) {
                            this.city_id_error = '';
                            return true;
                        } else {
                            this.city_id_error = 'شهر نمی تواند خالی باشد';
                            return false;
                        }
                }

            }
        }
    }
</script>

<style scoped>
    .map_container {
        width: 100%;
        height: 300px;
        margin-bottom: 3rem;
    }

    .modal-header h5 {
        font-size: 1rem;
        font-weight: 400;
    }

    .modal-header .close {
        padding: 0;
        margin: 0;
    }

    .digi_label {
        font-size: .786rem;
        line-height: 19px;
        margin-bottom: 4px;
        color: #030a16;
        margin-right: 12px;
        display: block;
    }

    .auth_title a {
        color: #212529;
        text-decoration: none;
    }

    .auth_title a:hover {
        color: #0fabc6;
    }

    .dg_input_div {
        margin-bottom: 15px;
    }

    .digi_input {
        width: 100%;
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid #e0e0e2;
        outline: none;
    }

    .digi_input:focus {
        border: 1px solid #0fabc6;

    }

    .digi_input::placeholder {
        color: #6a7079;
        font-size: .8rem;
    }

    .auth_button {
        background: #ef394e;
        width: 200px;
        border-radius: 8px;
        padding: 10px 8px;
        color: #fff;
        font-size: .95rem;
        font-weight: 400;
        border: none;
        margin: 35px 0 15px 0;
        display: block;
        text-align: center;
        cursor: pointer;
    }

    .auth_button:focus {
        outline: none;
    }

    @media (min-width: 992px) {
        .modal-lg, .modal-xl {
            max-width: 650px;
        }
    }

    .error {
        font-size: .75rem;
        color: #ef394e;
        padding: 5px;
    }

</style>
