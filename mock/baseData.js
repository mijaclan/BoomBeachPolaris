/**
 id: 1, 唯一id
 name: '', 武器名称
 count: 0, 个数
 initialEnergy: 3, 初始化能量
 incrementEnergy: 2, 递增能量，每次递增2
 consumedEnergy: [], 已消耗的能量
 nextEnergy: 3, 下一发要消耗的能量
 retention: true, 存在空中滞留
 retentionTime: 0 空中滞留时间
 */

/**
 * 等差d = 第n次技能能量值 - 第n-1次技能能量值; n >= 1
 * 第n项能量值 = (初始值 + 第n次 * 等差d);
 */

const baseData = [
  {
    id: 1,
    name: '火炮',
    count: 0,
    initialEnergy: 3,
    incrementEnergy: 2,
    consumedEnergy: [],
    nextEnergy: 3,
    retention: true,
    retentionTime: 2.749
  },
  {
    id: 2,
    name: '引导',
    count: 0,
    initialEnergy: 2,
    incrementEnergy: 1,
    consumedEnergy: [],
    nextEnergy: 2,
    retention: true,
    retentionTime: 1.766
  },
  {
    id: 3,
    name: '医疗包',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 3,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: true,
    retentionTime: 1.860
  },
  {
    id: 4,
    name: '震爆弹',
    count: 0,
    initialEnergy: 7,
    incrementEnergy: 5,
    consumedEnergy: [],
    nextEnergy: 7,
    retention: true,
    retentionTime: 1.741
  },
  {
    id: 5,
    name: '多管（单滞留）',
    count: 0,
    initialEnergy: 10,
    incrementEnergy: 6,
    consumedEnergy: [],
    nextEnergy: 10,
    retention: true,
    retentionTime: 1.857
  },
  {
    id: 6,
    name: '烟雾弹',
    count: 0,
    initialEnergy: 2,
    incrementEnergy: 1,
    consumedEnergy: [],
    nextEnergy: 2,
    retention: true,
    retentionTime: 1.795
  },
  {
    id: 7,
    name: '机器小怪',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 5,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: true,
    retentionTime: 3.150
  },
  {
    id: 8,
    name: '中士-榴弹',
    count: 0,
    initialEnergy: 3,
    incrementEnergy: 3,
    consumedEnergy: [],
    nextEnergy: 3,
    retention: false,
    retentionTime: 0
  },
  {
    id: 9,
    name: '中士-钢铁意志',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 12,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },
  {
    id: 10,
    name: '中士-怒吼',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 12,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },
  {
    id: 11,
    name: '巫医-晶簇小怪',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 7,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },
  {
    id: 12,
    name: '巫医-寒冰护盾',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 8,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },
  {
    id: 13,
    name: '巫医-亡灵召唤',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 10,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 14,
    name: '伊娃-遥控',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 7,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 15,
    name: '伊娃-炸弹',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 4,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },{
    id: 16,
    name: '伊娃-小怪',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 7,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 17,
    name: '列兵-嘲讽',
    count: 0,
    initialEnergy: 3,
    incrementEnergy: 2,
    consumedEnergy: [],
    nextEnergy: 3,
    retention: false,
    retentionTime: 0
  },{
    id: 18,
    name: '列兵-充能',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 8,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 19,
    name: '列兵-铁拳',
    count: 0,
    initialEnergy: 3,
    incrementEnergy: 6,
    consumedEnergy: [],
    nextEnergy: 3,
    retention: false,
    retentionTime: 0
  },{
    id: 20,
    name: '坦克(辆)',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 2,
    retention: false,
    retentionTime: 0
  },{
    id: 21,
    name: '火车(辆)',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 22,
    name: '迫击炮手（个）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 1,
    retention: false,
    retentionTime: 0
  },{
    id: 24,
    name: '机甲（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 12,
    retention: false,
    retentionTime: 0
  },{
    id: 25,
    name: '远程遥控',
    count: 0,
    initialEnergy: 10,
    incrementEnergy: 10,
    consumedEnergy: [],
    nextEnergy: 10,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 1.830
  },{
    id: 26,
    name: '加速血清',
    count: 0,
    initialEnergy: 6,
    incrementEnergy: 8,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 1.830
  },{
    id: 260,
    name: '超级野人',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 5,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 3.150
  },{
    id: 27,
    name: '水晶护盾',
    count: 0,
    initialEnergy: 5,
    incrementEnergy: 9,
    consumedEnergy: [],
    nextEnergy: 5,
    retention: true,
    retentionTime: 1.853
  },{
    id: 28,
    name: '微型震爆',
    count: 0,
    initialEnergy: 3,
    incrementEnergy: 3,
    consumedEnergy: [],
    nextEnergy: 3,
    retention: true,
    retentionTime: 1.830
  },{
    id: 29,
    name: '自爆小怪',
    count: 0,
    initialEnergy: 5,
    incrementEnergy: 5,
    consumedEnergy: [],
    nextEnergy: 5,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 3.150
  },{
    id: 30,
    name: '复苏水晶',
    count: 0,
    initialEnergy: 8,
    incrementEnergy: 10,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 1.830
  },{
    id: 301,
    name: '投放式炮塔',
    count: 0,
    initialEnergy: 5,
    incrementEnergy: 5,
    consumedEnergy: [],
    nextEnergy: 5,
    retention: true, // 暂时无数据参考战舰技能的，获取数据后更新 retentionTime
    retentionTime: 3.150
  },{
    id: 31,
    name: '原-弹雨战车（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },{
    id: 32,
    name: '原-激光坦克（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 6,
    retention: false,
    retentionTime: 0
  },{
    id: 33,
    name: '原-极冻坦克（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 18,
    retentionTime: 0
  },{
    id: 34,
    name: '原-小怪加农炮Ⅱ型（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 12,
    retention: false,
    retentionTime: 0
  },{
    id: 36,
    name: '原-火箭直升机（架）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 4,
    retention: false,
    retentionTime: 0
  },{
    id: 37,
    name: '原-重型直升机（架）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 8,
    retention: false,
    retentionTime: 0
  },{
    id: 38,
    name: '原-焚火战车（辆）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 10,
    retention: false,
    retentionTime: 0
  },{
    id: 39,
    name: '原-极冻/西瓜炮手（个）',
    count: 0,
    initialEnergy: 0,
    incrementEnergy: 0,
    consumedEnergy: [],
    nextEnergy: 1,
    retention: false,
    retentionTime: 0
  },
];

export default baseData;
