const config = <any>[];
export default config;

// 和风天气图标配置
/*
下载: npm i qweather-icons
  API返回"icon":"301"
图标字体: <i class="qi-301"></i>
官网查看图标
https://icons.qweather.com/icons/
也可下载所有svg到本地
https://github.com/qwd/Icons/releases/tag/v1.1.1
 */

// 返回参数配置
/**
updateTime	当前API的最近更新时间
fxLink	当前数据的响应式页面，便于嵌入网站或应用
fxDate	预报日期
sunrise	日出时间
sunset	日落时间
moonrise	月升时间
moonset	月落时间
moonPhase	月相名称
moonPhaseIcon	月相图标代码，图标可通过天气状况和图标下载
tempMax	预报当天最高温度
tempMin	预报当天最低温度
iconDay	预报白天天气状况的图标代码，图标可通过天气状况和图标下载
textDay	预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
iconNight	预报夜间天气状况的图标代码，图标可通过天气状况和图标下载
textNight	预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
wind360Day	预报白天风向360角度
windDirDay	预报白天风向
windScaleDay	预报白天风力等级
windSpeedDay	预报白天风速，公里/小时
wind360Night	预报夜间风向360角度
windDirNight	预报夜间当天风向
windScaleNight	预报夜间风力等级
windSpeedNight	预报夜间风速，公里/小时
precip	预报当天总降水量，默认单位：毫米
uvIndex	紫外线强度指数
humidity	相对湿度，百分比数值
pressure	大气压强，默认单位：百帕
vis	能见度，默认单位：公里
cloud	云量，百分比数值。可能为空
sources	原始数据来源，或数据源说明，可能为空
license	数据许可或版权声明，可能为空

fxTime	预报时间
temp	温度，默认单位：摄氏度
icon	天气状况和图标的代码，图标可通过天气状况和图标下载
text	天气状况的文字描述，包括阴晴雨雪等天气状态的描述
wind360	风向360角度
windDir	风向
windScale	风力等级
windSpeed	风速，公里/小时
humidity	相对湿度，百分比数值
precip	当前小时累计降水量，默认单位：毫米
pop	逐小时预报降水概率，百分比数值，可能为空
pressure	大气压强，默认单位：百帕
cloud	云量，百分比数值。可能为空
dew	露点温度。可能为空

warning.id	本条预警的唯一标识，可判断本条预警是否已经存在
warning.sender	预警发布单位，可能为空
warning.pubTime	预警发布时间
warning.title	预警信息标题
warning.startTime	预警开始时间，可能为空
warning.endTime	预警结束时间，可能为空
warning.status	预警信息的发布状态
warning.level	预警等级
warning.type	预警类型ID
warning.typeName	预警类型名称
warning.urgency	预警信息的紧迫程度，可能为空
warning.certainty	预警信息的确定性，可能为空
warning.text	预警详细文字描述
warning.related	与本条预警相关联的预警ID，当预警状态为cancel或update时返回。可能为空

now.aqi	空气质量指数
now.level	空气质量指数等级
now.category	空气质量指数级别
now.primary	空气质量的主要污染物，空气质量为优时，返回值为NA
now.pm10	PM10
now.pm2p5	PM2.5
now.no2	二氧化氮
now.so2	二氧化硫
now.co	一氧化碳
now.o3	臭氧

station.name	监测站名称
station.id	监测站ID
station.pubTime	空气质量数据发布时间
station.aqi	空气质量指数
station.level	空气质量指数等级
station.category	空气质量指数级别
station.primary	空气质量的主要污染物，空气质量为优时，返回值为NA
station.pm10	PM10
station.pm2p5	PM2.5
station.no2	二氧化氮
station.so2	二氧化硫
station.co	一氧化碳
station.o3	臭氧

sunrise	日出时间
sunset	日落时间

moonrise	月升时间
moonset	月落时间
moonPhase.fxTime	月相逐小时预报时间
moonPhase.value	月相数值
moonPhase.name	月相名字
moonPhase.icon	月相图标代码，图标可通过天气状况和图标下载
moonPhase.illumination	月亮照明度，百分比数值
 */

// 天气指数类型
/**
全部天气指数	0
运动指数	1
洗车指数	2
穿衣指数	3
钓鱼指数	4
紫外线指数	5
旅游指数	6
花粉过敏指数	7
舒适度指数	8
感冒指数	9
空气污染扩散条件指数	10
空调开启指数	11
太阳镜指数	12
化妆指数	13
晾晒指数	14
交通指数	15
防晒指数	16
 */

// 天气指数等级
/**
运动指数	适宜(1)、较适宜(2)、较不宜(3)
洗车指数	适宜(1)、较适宜(2)、较不宜(3)、不宜(4)
穿衣指数	寒冷(1)、冷(2)、较冷(3)、较舒适(4)、舒适(5)、热(6)、炎热(7)
钓鱼指数	适宜(1)、较适宜(2)、不宜(3)
紫外线指数	最弱(1)、弱(2)、中等(3)、强(4)、很强(5)
旅游指数	适宜(1)、较适宜(2)、一般(3)、较不宜(4)、不适宜(5)
花粉过敏指数	极不易发(1)、不易发(2)、较易发(3)、易发(4)、极易发(5)
舒适度指数	舒适(1)、较舒适(2)、较不舒适(3)、很不舒适(4)、极不舒适(5)、不舒适(6)、非常不舒适(7)
感冒指数	少发(1)、较易发(2)、易发(3)、极易发(4)
空气污染扩散条件指数	优(1)、良(2)、中(3)、较差(4)、很差(5)
空调开启指数	长时间开启(1)、部分时间开启(2)、较少开启(3)、开启制暖空调(4)
太阳镜指数	不需要(1)、需要(2)、必要(3)、很必要(4)、非常必要(5)
化妆指数	保湿(1)、保湿防晒(2)、去油防晒(3)、防脱水防晒(4)、去油(5)、防脱水(6)、防晒(7)、滋润保湿(8)
晾晒指数	极适宜(1)、适宜(2)、基本适宜(3)、不太适宜(4)、不宜(5)、不适宜(6)
交通指数	良好(1)、较好(2)、一般(3)、较差(4)、很差(5)
防晒指数	弱(1)、较弱(2)、中等(3)、强(4)、极强(5)
 */
