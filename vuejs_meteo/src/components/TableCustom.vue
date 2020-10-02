<template>
    <div>
        <b-table striped hover :items="this.tableData"></b-table>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: 'TableCustom',
        data() {
            return {
                // Note `isActive` is left out and will not appear in the rendered table
                fields: ['temp_min', 'temp'],
            }
        },
        asyncComputed: {
            tableData: {
                get() {
                    let array=[]
                    this.weatherDataList.list.forEach(element => {
                        array.push({heure: moment((element.dt + this.weatherDataList.city.timezone - 7200)*1000).locale('fr').format('DD/MM/YYYY - HH:mm') ,
                            temps: element.weather[0].description,
                            temperature:element.main.temp + "°C",
                            "temperature moyenne" : (Math.round((element.main.temp_min + element.main.temp_max) / 2 *100)/100) + "°C",
                            ressentie: element.main.feels_like + "°C", "humidité":element.main.humidity +"%",
                            pression:element.main.pressure + " hpa",
                            vent: element.wind.speed + "m/s",
                        })
                    })
                    return array;
                },
                default() {
                    return 'Chargement';
                },
            },
        },
        props:{
            weatherDataList: Object,
        },
        filters: {
            tempFormat: function (temperature) {
                return `${Math.round(temperature * 100) / 100} °C`;
            },
            formatDate : function (value) {
                return moment(value*1000).locale('fr').format('DD/MM/YYYY - HH:mm');
            }
        }

    }
</script>
