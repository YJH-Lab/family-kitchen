// 数据库初始化脚本，用于批量导入 120 道菜品
const initialDishes = [
  {
    "name": "宫保鸡丁",
    "category": "特色",
    "price": 88,
    "desc": "美味的宫保鸡丁，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "11g"
      },
      {
        "name": "姜",
        "weight": "279g"
      },
      {
        "name": "青椒",
        "weight": "154g"
      },
      {
        "name": "糖",
        "weight": "87g"
      },
      {
        "name": "鱼肉",
        "weight": "137g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "毛血旺",
    "category": "特色",
    "price": 88,
    "desc": "美味的毛血旺，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "盐",
        "weight": "111g"
      },
      {
        "name": "土豆",
        "weight": "206g"
      },
      {
        "name": "生抽",
        "weight": "209g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "水煮肉片",
    "category": "特色",
    "price": 58,
    "desc": "美味的水煮肉片，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "189g"
      },
      {
        "name": "牛肉",
        "weight": "295g"
      },
      {
        "name": "老抽",
        "weight": "154g"
      },
      {
        "name": "糖",
        "weight": "146g"
      },
      {
        "name": "盐",
        "weight": "67g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "酸菜鱼",
    "category": "特色",
    "price": 58,
    "desc": "美味的酸菜鱼，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "158g"
      },
      {
        "name": "糖",
        "weight": "131g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "剁椒鱼头",
    "category": "特色",
    "price": 68,
    "desc": "美味的剁椒鱼头，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "27g"
      },
      {
        "name": "青椒",
        "weight": "176g"
      },
      {
        "name": "糖",
        "weight": "168g"
      },
      {
        "name": "土豆",
        "weight": "65g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "辣子鸡",
    "category": "特色",
    "price": 88,
    "desc": "美味的辣子鸡，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "80g"
      },
      {
        "name": "胡萝卜",
        "weight": "236g"
      },
      {
        "name": "土豆",
        "weight": "269g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "东坡肉",
    "category": "特色",
    "price": 88,
    "desc": "美味的东坡肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "127g"
      },
      {
        "name": "糖",
        "weight": "128g"
      },
      {
        "name": "土豆",
        "weight": "179g"
      },
      {
        "name": "胡萝卜",
        "weight": "171g"
      },
      {
        "name": "葱",
        "weight": "179g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "鱼香肉丝",
    "category": "特色",
    "price": 58,
    "desc": "美味的鱼香肉丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鸡肉",
        "weight": "211g"
      },
      {
        "name": "鱼肉",
        "weight": "219g"
      },
      {
        "name": "盐",
        "weight": "164g"
      },
      {
        "name": "葱",
        "weight": "80g"
      },
      {
        "name": "蒜",
        "weight": "150g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "糖醋排骨",
    "category": "特色",
    "price": 68,
    "desc": "美味的糖醋排骨，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "268g"
      },
      {
        "name": "料酒",
        "weight": "48g"
      },
      {
        "name": "猪肉",
        "weight": "208g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "回锅肉",
    "category": "特色",
    "price": 68,
    "desc": "美味的回锅肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "114g"
      },
      {
        "name": "鱼肉",
        "weight": "247g"
      },
      {
        "name": "蒜",
        "weight": "47g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "麻婆豆腐",
    "category": "特色",
    "price": 68,
    "desc": "美味的麻婆豆腐，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "24g"
      },
      {
        "name": "青椒",
        "weight": "279g"
      },
      {
        "name": "姜",
        "weight": "187g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "叫花鸡",
    "category": "特色",
    "price": 58,
    "desc": "美味的叫花鸡，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "261g"
      },
      {
        "name": "老抽",
        "weight": "91g"
      },
      {
        "name": "鱼肉",
        "weight": "222g"
      },
      {
        "name": "生抽",
        "weight": "206g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "夫妻肺片",
    "category": "特色",
    "price": 58,
    "desc": "美味的夫妻肺片，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "138g"
      },
      {
        "name": "老抽",
        "weight": "108g"
      },
      {
        "name": "盐",
        "weight": "229g"
      },
      {
        "name": "糖",
        "weight": "14g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "粉蒸肉",
    "category": "特色",
    "price": 58,
    "desc": "美味的粉蒸肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "115g"
      },
      {
        "name": "糖",
        "weight": "153g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "梅菜扣肉",
    "category": "特色",
    "price": 48,
    "desc": "美味的梅菜扣肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "84g"
      },
      {
        "name": "葱",
        "weight": "200g"
      },
      {
        "name": "盐",
        "weight": "292g"
      },
      {
        "name": "生抽",
        "weight": "182g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "红烧狮子头",
    "category": "特色",
    "price": 68,
    "desc": "美味的红烧狮子头，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "212g"
      },
      {
        "name": "土豆",
        "weight": "216g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蚂蚁上树",
    "category": "特色",
    "price": 88,
    "desc": "美味的蚂蚁上树，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "101g"
      },
      {
        "name": "生抽",
        "weight": "20g"
      },
      {
        "name": "姜",
        "weight": "41g"
      },
      {
        "name": "胡萝卜",
        "weight": "202g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "盐水鸭",
    "category": "特色",
    "price": 68,
    "desc": "美味的盐水鸭，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "215g"
      },
      {
        "name": "盐",
        "weight": "243g"
      },
      {
        "name": "猪肉",
        "weight": "93g"
      },
      {
        "name": "糖",
        "weight": "29g"
      },
      {
        "name": "蒜",
        "weight": "51g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "白切鸡",
    "category": "特色",
    "price": 48,
    "desc": "美味的白切鸡，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "79g"
      },
      {
        "name": "蒜",
        "weight": "188g"
      },
      {
        "name": "生抽",
        "weight": "20g"
      },
      {
        "name": "牛肉",
        "weight": "262g"
      },
      {
        "name": "糖",
        "weight": "278g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "脆皮烧肉",
    "category": "特色",
    "price": 68,
    "desc": "美味的脆皮烧肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "256g"
      },
      {
        "name": "土豆",
        "weight": "94g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蜜汁叉烧",
    "category": "特色",
    "price": 58,
    "desc": "美味的蜜汁叉烧，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "58g"
      },
      {
        "name": "生抽",
        "weight": "295g"
      },
      {
        "name": "青椒",
        "weight": "290g"
      },
      {
        "name": "猪肉",
        "weight": "62g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "腊味合蒸",
    "category": "特色",
    "price": 88,
    "desc": "美味的腊味合蒸，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "46g"
      },
      {
        "name": "牛肉",
        "weight": "248g"
      },
      {
        "name": "猪肉",
        "weight": "38g"
      },
      {
        "name": "老抽",
        "weight": "186g"
      },
      {
        "name": "胡萝卜",
        "weight": "300g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "啤酒鸭",
    "category": "特色",
    "price": 48,
    "desc": "美味的啤酒鸭，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鸡肉",
        "weight": "171g"
      },
      {
        "name": "生抽",
        "weight": "78g"
      },
      {
        "name": "青椒",
        "weight": "140g"
      },
      {
        "name": "鱼肉",
        "weight": "144g"
      },
      {
        "name": "蒜",
        "weight": "106g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "干锅牛蛙",
    "category": "特色",
    "price": 58,
    "desc": "美味的干锅牛蛙，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "165g"
      },
      {
        "name": "糖",
        "weight": "94g"
      },
      {
        "name": "葱",
        "weight": "122g"
      },
      {
        "name": "盐",
        "weight": "186g"
      },
      {
        "name": "鱼肉",
        "weight": "165g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蒜香排骨",
    "category": "特色",
    "price": 58,
    "desc": "美味的蒜香排骨，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "128g"
      },
      {
        "name": "葱",
        "weight": "240g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "菠萝咕噜肉",
    "category": "特色",
    "price": 68,
    "desc": "美味的菠萝咕噜肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "223g"
      },
      {
        "name": "盐",
        "weight": "115g"
      },
      {
        "name": "胡萝卜",
        "weight": "288g"
      },
      {
        "name": "蒜",
        "weight": "56g"
      },
      {
        "name": "葱",
        "weight": "119g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "铁板黑椒牛肉",
    "category": "特色",
    "price": 58,
    "desc": "美味的铁板黑椒牛肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "41g"
      },
      {
        "name": "料酒",
        "weight": "291g"
      },
      {
        "name": "胡萝卜",
        "weight": "36g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "烤鱼",
    "category": "特色",
    "price": 68,
    "desc": "美味的烤鱼，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "231g"
      },
      {
        "name": "糖",
        "weight": "143g"
      },
      {
        "name": "生抽",
        "weight": "279g"
      },
      {
        "name": "胡萝卜",
        "weight": "35g"
      },
      {
        "name": "牛肉",
        "weight": "201g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "酱鸭",
    "category": "特色",
    "price": 88,
    "desc": "美味的酱鸭，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "27g"
      },
      {
        "name": "胡萝卜",
        "weight": "201g"
      },
      {
        "name": "土豆",
        "weight": "227g"
      },
      {
        "name": "猪肉",
        "weight": "222g"
      },
      {
        "name": "牛肉",
        "weight": "262g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "葱烧海参",
    "category": "特色",
    "price": 68,
    "desc": "美味的葱烧海参，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "233g"
      },
      {
        "name": "鸡肉",
        "weight": "211g"
      },
      {
        "name": "猪肉",
        "weight": "287g"
      },
      {
        "name": "牛肉",
        "weight": "264g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "拍黄瓜",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的拍黄瓜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "241g"
      },
      {
        "name": "盐",
        "weight": "123g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌木耳",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的凉拌木耳，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "211g"
      },
      {
        "name": "葱",
        "weight": "215g"
      },
      {
        "name": "姜",
        "weight": "83g"
      },
      {
        "name": "鸡肉",
        "weight": "211g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "老醋花生",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的老醋花生，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "83g"
      },
      {
        "name": "盐",
        "weight": "17g"
      },
      {
        "name": "鸡肉",
        "weight": "253g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌海带丝",
    "category": "冷菜",
    "price": 12,
    "desc": "美味的凉拌海带丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "盐",
        "weight": "208g"
      },
      {
        "name": "葱",
        "weight": "188g"
      },
      {
        "name": "猪肉",
        "weight": "134g"
      },
      {
        "name": "牛肉",
        "weight": "89g"
      },
      {
        "name": "糖",
        "weight": "259g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蒜泥白肉",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的蒜泥白肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "224g"
      },
      {
        "name": "生抽",
        "weight": "229g"
      },
      {
        "name": "盐",
        "weight": "178g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌腐竹",
    "category": "冷菜",
    "price": 12,
    "desc": "美味的凉拌腐竹，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "233g"
      },
      {
        "name": "胡萝卜",
        "weight": "51g"
      },
      {
        "name": "老抽",
        "weight": "289g"
      },
      {
        "name": "青椒",
        "weight": "158g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "皮蛋豆腐",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的皮蛋豆腐，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "249g"
      },
      {
        "name": "蒜",
        "weight": "294g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌金针菇",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的凉拌金针菇，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "23g"
      },
      {
        "name": "蒜",
        "weight": "232g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "柠檬泡鸡爪",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的柠檬泡鸡爪，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "34g"
      },
      {
        "name": "糖",
        "weight": "249g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "盐水毛豆",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的盐水毛豆，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "46g"
      },
      {
        "name": "土豆",
        "weight": "86g"
      },
      {
        "name": "葱",
        "weight": "209g"
      },
      {
        "name": "生抽",
        "weight": "293g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌猪耳朵",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的凉拌猪耳朵，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "129g"
      },
      {
        "name": "鸡肉",
        "weight": "30g"
      },
      {
        "name": "葱",
        "weight": "88g"
      },
      {
        "name": "生抽",
        "weight": "33g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "泡椒凤爪",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的泡椒凤爪，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "196g"
      },
      {
        "name": "猪肉",
        "weight": "263g"
      },
      {
        "name": "糖",
        "weight": "21g"
      },
      {
        "name": "蒜",
        "weight": "151g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌海蜇",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的凉拌海蜇，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "50g"
      },
      {
        "name": "料酒",
        "weight": "57g"
      },
      {
        "name": "老抽",
        "weight": "65g"
      },
      {
        "name": "青椒",
        "weight": "105g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "葱油拌面",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的葱油拌面，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "265g"
      },
      {
        "name": "蒜",
        "weight": "172g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌千张",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的凉拌千张，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "120g"
      },
      {
        "name": "猪肉",
        "weight": "200g"
      },
      {
        "name": "鸡肉",
        "weight": "206g"
      },
      {
        "name": "葱",
        "weight": "272g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌折耳根",
    "category": "冷菜",
    "price": 12,
    "desc": "美味的凉拌折耳根，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "59g"
      },
      {
        "name": "糖",
        "weight": "154g"
      },
      {
        "name": "盐",
        "weight": "147g"
      },
      {
        "name": "生抽",
        "weight": "222g"
      },
      {
        "name": "胡萝卜",
        "weight": "291g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌酱牛肉",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的凉拌酱牛肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "163g"
      },
      {
        "name": "土豆",
        "weight": "270g"
      },
      {
        "name": "料酒",
        "weight": "165g"
      },
      {
        "name": "姜",
        "weight": "22g"
      },
      {
        "name": "糖",
        "weight": "240g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "潮汕卤水拼盘",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的潮汕卤水拼盘，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "217g"
      },
      {
        "name": "青椒",
        "weight": "207g"
      },
      {
        "name": "姜",
        "weight": "162g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "桂花糯米藕",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的桂花糯米藕，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "280g"
      },
      {
        "name": "料酒",
        "weight": "226g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌苦瓜",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的凉拌苦瓜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "284g"
      },
      {
        "name": "生抽",
        "weight": "70g"
      },
      {
        "name": "土豆",
        "weight": "296g"
      },
      {
        "name": "鸡肉",
        "weight": "118g"
      },
      {
        "name": "葱",
        "weight": "286g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "捞汁秋葵",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的捞汁秋葵，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "74g"
      },
      {
        "name": "蒜",
        "weight": "38g"
      },
      {
        "name": "鱼肉",
        "weight": "122g"
      },
      {
        "name": "料酒",
        "weight": "199g"
      },
      {
        "name": "老抽",
        "weight": "243g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌三丝",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的凉拌三丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "29g"
      },
      {
        "name": "土豆",
        "weight": "161g"
      },
      {
        "name": "生抽",
        "weight": "67g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "香干拌马兰头",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的香干拌马兰头，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "229g"
      },
      {
        "name": "老抽",
        "weight": "289g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蒜香茄泥",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的蒜香茄泥，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "245g"
      },
      {
        "name": "牛肉",
        "weight": "136g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "冰镇咕噜肉",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的冰镇咕噜肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "85g"
      },
      {
        "name": "牛肉",
        "weight": "86g"
      },
      {
        "name": "糖",
        "weight": "195g"
      },
      {
        "name": "盐",
        "weight": "118g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "拌黄花菜",
    "category": "冷菜",
    "price": 12,
    "desc": "美味的拌黄花菜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "104g"
      },
      {
        "name": "牛肉",
        "weight": "156g"
      },
      {
        "name": "青椒",
        "weight": "138g"
      },
      {
        "name": "盐",
        "weight": "213g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "姜汁菠菜",
    "category": "冷菜",
    "price": 22,
    "desc": "美味的姜汁菠菜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "75g"
      },
      {
        "name": "猪肉",
        "weight": "216g"
      },
      {
        "name": "盐",
        "weight": "14g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "芝麻酱拌豆角",
    "category": "冷菜",
    "price": 28,
    "desc": "美味的芝麻酱拌豆角，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "149g"
      },
      {
        "name": "猪肉",
        "weight": "88g"
      },
      {
        "name": "姜",
        "weight": "123g"
      },
      {
        "name": "鱼肉",
        "weight": "98g"
      },
      {
        "name": "老抽",
        "weight": "202g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "红油肚丝",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的红油肚丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "74g"
      },
      {
        "name": "蒜",
        "weight": "46g"
      },
      {
        "name": "土豆",
        "weight": "255g"
      },
      {
        "name": "生抽",
        "weight": "263g"
      },
      {
        "name": "猪肉",
        "weight": "195g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "凉拌莴笋丝",
    "category": "冷菜",
    "price": 18,
    "desc": "美味的凉拌莴笋丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "132g"
      },
      {
        "name": "料酒",
        "weight": "200g"
      },
      {
        "name": "生抽",
        "weight": "255g"
      },
      {
        "name": "土豆",
        "weight": "81g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "番茄炒蛋",
    "category": "热菜",
    "price": 28,
    "desc": "美味的番茄炒蛋，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "242g"
      },
      {
        "name": "葱",
        "weight": "118g"
      },
      {
        "name": "盐",
        "weight": "189g"
      },
      {
        "name": "蒜",
        "weight": "148g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "青椒肉丝",
    "category": "热菜",
    "price": 58,
    "desc": "美味的青椒肉丝，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "242g"
      },
      {
        "name": "蒜",
        "weight": "131g"
      },
      {
        "name": "牛肉",
        "weight": "186g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "农家小炒肉",
    "category": "热菜",
    "price": 38,
    "desc": "美味的农家小炒肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "61g"
      },
      {
        "name": "鸡肉",
        "weight": "167g"
      },
      {
        "name": "姜",
        "weight": "202g"
      },
      {
        "name": "青椒",
        "weight": "227g"
      },
      {
        "name": "牛肉",
        "weight": "209g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "地三鲜",
    "category": "热菜",
    "price": 28,
    "desc": "美味的地三鲜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "142g"
      },
      {
        "name": "姜",
        "weight": "190g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "红烧茄子",
    "category": "热菜",
    "price": 18,
    "desc": "美味的红烧茄子，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "盐",
        "weight": "144g"
      },
      {
        "name": "青椒",
        "weight": "154g"
      },
      {
        "name": "糖",
        "weight": "152g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蒜蓉西兰花",
    "category": "热菜",
    "price": 48,
    "desc": "美味的蒜蓉西兰花，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "225g"
      },
      {
        "name": "鸡肉",
        "weight": "233g"
      },
      {
        "name": "盐",
        "weight": "131g"
      },
      {
        "name": "姜",
        "weight": "52g"
      },
      {
        "name": "牛肉",
        "weight": "27g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "干煸四季豆",
    "category": "热菜",
    "price": 48,
    "desc": "美味的干煸四季豆，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "288g"
      },
      {
        "name": "鸡肉",
        "weight": "92g"
      },
      {
        "name": "料酒",
        "weight": "251g"
      },
      {
        "name": "盐",
        "weight": "19g"
      },
      {
        "name": "生抽",
        "weight": "195g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "爆炒腰花",
    "category": "热菜",
    "price": 28,
    "desc": "美味的爆炒腰花，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "66g"
      },
      {
        "name": "葱",
        "weight": "171g"
      },
      {
        "name": "胡萝卜",
        "weight": "236g"
      },
      {
        "name": "鸡肉",
        "weight": "62g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "红烧肉",
    "category": "热菜",
    "price": 28,
    "desc": "美味的红烧肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "120g"
      },
      {
        "name": "猪肉",
        "weight": "275g"
      },
      {
        "name": "鸡肉",
        "weight": "21g"
      },
      {
        "name": "鱼肉",
        "weight": "267g"
      },
      {
        "name": "牛肉",
        "weight": "66g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "葱爆羊肉",
    "category": "热菜",
    "price": 28,
    "desc": "美味的葱爆羊肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "93g"
      },
      {
        "name": "生抽",
        "weight": "148g"
      },
      {
        "name": "姜",
        "weight": "26g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "爆炒肥肠",
    "category": "热菜",
    "price": 58,
    "desc": "美味的爆炒肥肠，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "267g"
      },
      {
        "name": "蒜",
        "weight": "229g"
      },
      {
        "name": "姜",
        "weight": "263g"
      },
      {
        "name": "生抽",
        "weight": "297g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "芹菜炒香干",
    "category": "热菜",
    "price": 48,
    "desc": "美味的芹菜炒香干，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "78g"
      },
      {
        "name": "糖",
        "weight": "68g"
      },
      {
        "name": "牛肉",
        "weight": "265g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "韭菜炒鸡蛋",
    "category": "热菜",
    "price": 18,
    "desc": "美味的韭菜炒鸡蛋，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "183g"
      },
      {
        "name": "土豆",
        "weight": "288g"
      },
      {
        "name": "鸡肉",
        "weight": "83g"
      },
      {
        "name": "牛肉",
        "weight": "274g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "木须肉",
    "category": "热菜",
    "price": 38,
    "desc": "美味的木须肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "75g"
      },
      {
        "name": "生抽",
        "weight": "83g"
      },
      {
        "name": "盐",
        "weight": "42g"
      },
      {
        "name": "蒜",
        "weight": "59g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "蒜蓉炒青菜",
    "category": "热菜",
    "price": 28,
    "desc": "美味的蒜蓉炒青菜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "101g"
      },
      {
        "name": "猪肉",
        "weight": "148g"
      },
      {
        "name": "老抽",
        "weight": "20g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "耗油生菜",
    "category": "热菜",
    "price": 58,
    "desc": "美味的耗油生菜，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "14g"
      },
      {
        "name": "胡萝卜",
        "weight": "13g"
      },
      {
        "name": "老抽",
        "weight": "67g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "香菇滑鸡",
    "category": "热菜",
    "price": 28,
    "desc": "美味的香菇滑鸡，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "274g"
      },
      {
        "name": "青椒",
        "weight": "114g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "土豆烧牛肉",
    "category": "热菜",
    "price": 28,
    "desc": "美味的土豆烧牛肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "姜",
        "weight": "228g"
      },
      {
        "name": "鸡肉",
        "weight": "68g"
      },
      {
        "name": "葱",
        "weight": "58g"
      },
      {
        "name": "青椒",
        "weight": "15g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "豆角焖面",
    "category": "热菜",
    "price": 48,
    "desc": "美味的豆角焖面，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "194g"
      },
      {
        "name": "老抽",
        "weight": "72g"
      },
      {
        "name": "蒜",
        "weight": "174g"
      },
      {
        "name": "土豆",
        "weight": "128g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "红烧带鱼",
    "category": "热菜",
    "price": 38,
    "desc": "美味的红烧带鱼，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "181g"
      },
      {
        "name": "鱼肉",
        "weight": "206g"
      },
      {
        "name": "糖",
        "weight": "290g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "清蒸鲈鱼",
    "category": "热菜",
    "price": 28,
    "desc": "美味的清蒸鲈鱼，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "188g"
      },
      {
        "name": "鸡肉",
        "weight": "299g"
      },
      {
        "name": "料酒",
        "weight": "22g"
      },
      {
        "name": "蒜",
        "weight": "114g"
      },
      {
        "name": "猪肉",
        "weight": "158g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "糖醋里脊",
    "category": "热菜",
    "price": 38,
    "desc": "美味的糖醋里脊，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "188g"
      },
      {
        "name": "老抽",
        "weight": "133g"
      },
      {
        "name": "牛肉",
        "weight": "82g"
      },
      {
        "name": "青椒",
        "weight": "272g"
      },
      {
        "name": "猪肉",
        "weight": "250g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "滑炒虾仁",
    "category": "热菜",
    "price": 38,
    "desc": "美味的滑炒虾仁，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "219g"
      },
      {
        "name": "葱",
        "weight": "64g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "爆炒花甲",
    "category": "热菜",
    "price": 28,
    "desc": "美味的爆炒花甲，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "296g"
      },
      {
        "name": "鸡肉",
        "weight": "110g"
      },
      {
        "name": "胡萝卜",
        "weight": "268g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "铁板豆腐",
    "category": "热菜",
    "price": 58,
    "desc": "美味的铁板豆腐，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "225g"
      },
      {
        "name": "料酒",
        "weight": "72g"
      },
      {
        "name": "生抽",
        "weight": "99g"
      },
      {
        "name": "老抽",
        "weight": "85g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "香煎酿豆腐",
    "category": "热菜",
    "price": 58,
    "desc": "美味的香煎酿豆腐，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "228g"
      },
      {
        "name": "胡萝卜",
        "weight": "246g"
      },
      {
        "name": "蒜",
        "weight": "87g"
      },
      {
        "name": "糖",
        "weight": "57g"
      },
      {
        "name": "鱼肉",
        "weight": "89g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "溜肉段",
    "category": "热菜",
    "price": 38,
    "desc": "美味的溜肉段，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "124g"
      },
      {
        "name": "猪肉",
        "weight": "234g"
      },
      {
        "name": "盐",
        "weight": "181g"
      },
      {
        "name": "料酒",
        "weight": "173g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "锅包肉",
    "category": "热菜",
    "price": 48,
    "desc": "美味的锅包肉，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "97g"
      },
      {
        "name": "糖",
        "weight": "111g"
      },
      {
        "name": "青椒",
        "weight": "177g"
      },
      {
        "name": "猪肉",
        "weight": "235g"
      },
      {
        "name": "盐",
        "weight": "200g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "溜肝尖",
    "category": "热菜",
    "price": 38,
    "desc": "美味的溜肝尖，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "208g"
      },
      {
        "name": "蒜",
        "weight": "164g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "酱爆茄子",
    "category": "热菜",
    "price": 48,
    "desc": "美味的酱爆茄子，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "45g"
      },
      {
        "name": "鸡肉",
        "weight": "76g"
      },
      {
        "name": "姜",
        "weight": "241g"
      },
      {
        "name": "糖",
        "weight": "285g"
      },
      {
        "name": "料酒",
        "weight": "46g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "紫菜蛋花汤",
    "category": "汤",
    "price": 18,
    "desc": "美味的紫菜蛋花汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鸡肉",
        "weight": "229g"
      },
      {
        "name": "生抽",
        "weight": "152g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "番茄煎蛋汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的番茄煎蛋汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "192g"
      },
      {
        "name": "胡萝卜",
        "weight": "12g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "排骨玉米炖汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的排骨玉米炖汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "195g"
      },
      {
        "name": "料酒",
        "weight": "148g"
      },
      {
        "name": "青椒",
        "weight": "198g"
      },
      {
        "name": "蒜",
        "weight": "129g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "鲫鱼豆腐汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的鲫鱼豆腐汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "105g"
      },
      {
        "name": "料酒",
        "weight": "153g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "冬瓜肉丸汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的冬瓜肉丸汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "292g"
      },
      {
        "name": "鸡肉",
        "weight": "104g"
      },
      {
        "name": "胡萝卜",
        "weight": "196g"
      },
      {
        "name": "糖",
        "weight": "213g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "滋补老母鸡汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的滋补老母鸡汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "203g"
      },
      {
        "name": "料酒",
        "weight": "191g"
      },
      {
        "name": "青椒",
        "weight": "178g"
      },
      {
        "name": "老抽",
        "weight": "242g"
      },
      {
        "name": "盐",
        "weight": "297g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "清炖鸽子汤",
    "category": "汤",
    "price": 12,
    "desc": "美味的清炖鸽子汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鸡肉",
        "weight": "39g"
      },
      {
        "name": "青椒",
        "weight": "186g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "猪肚包鸡汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的猪肚包鸡汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "88g"
      },
      {
        "name": "蒜",
        "weight": "115g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "传统酸辣汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的传统酸辣汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "67g"
      },
      {
        "name": "糖",
        "weight": "242g"
      },
      {
        "name": "鱼肉",
        "weight": "86g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "西湖牛肉羹",
    "category": "汤",
    "price": 28,
    "desc": "美味的西湖牛肉羹，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "155g"
      },
      {
        "name": "糖",
        "weight": "175g"
      },
      {
        "name": "蒜",
        "weight": "184g"
      },
      {
        "name": "牛肉",
        "weight": "233g"
      },
      {
        "name": "盐",
        "weight": "206g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "罗宋汤",
    "category": "汤",
    "price": 18,
    "desc": "美味的罗宋汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "料酒",
        "weight": "125g"
      },
      {
        "name": "蒜",
        "weight": "241g"
      },
      {
        "name": "老抽",
        "weight": "136g"
      },
      {
        "name": "姜",
        "weight": "46g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "奶油蘑菇汤",
    "category": "汤",
    "price": 12,
    "desc": "美味的奶油蘑菇汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "土豆",
        "weight": "61g"
      },
      {
        "name": "鱼肉",
        "weight": "241g"
      },
      {
        "name": "姜",
        "weight": "296g"
      },
      {
        "name": "葱",
        "weight": "166g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "莲藕排骨汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的莲藕排骨汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "老抽",
        "weight": "44g"
      },
      {
        "name": "蒜",
        "weight": "65g"
      },
      {
        "name": "生抽",
        "weight": "249g"
      },
      {
        "name": "青椒",
        "weight": "229g"
      },
      {
        "name": "胡萝卜",
        "weight": "219g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "山药炖排骨",
    "category": "汤",
    "price": 28,
    "desc": "美味的山药炖排骨，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鱼肉",
        "weight": "115g"
      },
      {
        "name": "老抽",
        "weight": "15g"
      },
      {
        "name": "糖",
        "weight": "244g"
      },
      {
        "name": "猪肉",
        "weight": "135g"
      },
      {
        "name": "盐",
        "weight": "227g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "银耳莲子羹",
    "category": "汤",
    "price": 12,
    "desc": "美味的银耳莲子羹，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "163g"
      },
      {
        "name": "鱼肉",
        "weight": "201g"
      },
      {
        "name": "葱",
        "weight": "259g"
      },
      {
        "name": "蒜",
        "weight": "39g"
      },
      {
        "name": "糖",
        "weight": "287g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "清凉绿豆汤",
    "category": "汤",
    "price": 12,
    "desc": "美味的清凉绿豆汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "243g"
      },
      {
        "name": "盐",
        "weight": "203g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "猪肝枸杞汤",
    "category": "汤",
    "price": 18,
    "desc": "美味的猪肝枸杞汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "212g"
      },
      {
        "name": "猪肉",
        "weight": "194g"
      },
      {
        "name": "土豆",
        "weight": "21g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "乌鸡白凤汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的乌鸡白凤汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "123g"
      },
      {
        "name": "胡萝卜",
        "weight": "154g"
      },
      {
        "name": "土豆",
        "weight": "203g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "海带排骨汤",
    "category": "汤",
    "price": 18,
    "desc": "美味的海带排骨汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "27g"
      },
      {
        "name": "料酒",
        "weight": "48g"
      },
      {
        "name": "老抽",
        "weight": "226g"
      },
      {
        "name": "猪肉",
        "weight": "102g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "野生菌菇汤",
    "category": "汤",
    "price": 18,
    "desc": "美味的野生菌菇汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "糖",
        "weight": "59g"
      },
      {
        "name": "青椒",
        "weight": "152g"
      },
      {
        "name": "蒜",
        "weight": "261g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "丝瓜虾仁汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的丝瓜虾仁汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "蒜",
        "weight": "154g"
      },
      {
        "name": "料酒",
        "weight": "125g"
      },
      {
        "name": "姜",
        "weight": "230g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "豆腐脑羹",
    "category": "汤",
    "price": 12,
    "desc": "美味的豆腐脑羹，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "298g"
      },
      {
        "name": "土豆",
        "weight": "261g"
      },
      {
        "name": "糖",
        "weight": "172g"
      },
      {
        "name": "葱",
        "weight": "14g"
      },
      {
        "name": "鱼肉",
        "weight": "298g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "老北京疙瘩汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的老北京疙瘩汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "生抽",
        "weight": "189g"
      },
      {
        "name": "姜",
        "weight": "196g"
      },
      {
        "name": "猪肉",
        "weight": "152g"
      },
      {
        "name": "老抽",
        "weight": "94g"
      },
      {
        "name": "蒜",
        "weight": "282g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "羊肉清汤",
    "category": "汤",
    "price": 12,
    "desc": "美味的羊肉清汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "102g"
      },
      {
        "name": "盐",
        "weight": "184g"
      },
      {
        "name": "鱼肉",
        "weight": "278g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "牛肉粉丝汤",
    "category": "汤",
    "price": 12,
    "desc": "美味的牛肉粉丝汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "青椒",
        "weight": "282g"
      },
      {
        "name": "鸡肉",
        "weight": "284g"
      },
      {
        "name": "老抽",
        "weight": "82g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "鸭血粉丝汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的鸭血粉丝汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "胡萝卜",
        "weight": "134g"
      },
      {
        "name": "青椒",
        "weight": "250g"
      },
      {
        "name": "料酒",
        "weight": "90g"
      },
      {
        "name": "姜",
        "weight": "33g"
      },
      {
        "name": "土豆",
        "weight": "29g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "萝卜炖牛腩",
    "category": "汤",
    "price": 28,
    "desc": "美味的萝卜炖牛腩，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "猪肉",
        "weight": "251g"
      },
      {
        "name": "胡萝卜",
        "weight": "56g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "花蛤豆腐汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的花蛤豆腐汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "牛肉",
        "weight": "86g"
      },
      {
        "name": "葱",
        "weight": "133g"
      },
      {
        "name": "姜",
        "weight": "53g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "虾皮冬瓜汤",
    "category": "汤",
    "price": 28,
    "desc": "美味的虾皮冬瓜汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "鸡肉",
        "weight": "41g"
      },
      {
        "name": "猪肉",
        "weight": "190g"
      },
      {
        "name": "糖",
        "weight": "293g"
      },
      {
        "name": "生抽",
        "weight": "80g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  },
  {
    "name": "黄豆焖猪蹄汤",
    "category": "汤",
    "price": 22,
    "desc": "美味的黄豆焖猪蹄汤，经典地道，让人回味无穷。",
    "image": "cloud://xxxx.png",
    "ingredients": [
      {
        "name": "葱",
        "weight": "136g"
      },
      {
        "name": "老抽",
        "weight": "238g"
      }
    ],
    "steps": [
      {
        "step": 1,
        "text": "准备好所有食材，洗净切好备用。"
      },
      {
        "step": 2,
        "text": "热锅凉油，放入葱姜蒜爆香。"
      },
      {
        "step": 3,
        "text": "加入主料翻炒至变色。"
      },
      {
        "step": 4,
        "text": "加入调味料，大火收汁即可出锅。"
      }
    ]
  }
];

export const initDatabase = async () => {
  if (!wx.cloud) return;
  const db = wx.cloud.database();
  const collection = db.collection('dishes');

  try {
    wx.showLoading({ title: '检查数据库...', mask: true });
    const countResult = await collection.count();

    if (countResult.total > 0) {
      wx.hideLoading();
      console.log('dishes 集合已有数据，跳过初始化。');
      return;
    }

    console.log('开始执行分块批量插入 120 条数据...');
    wx.showLoading({ title: '导入数据中...', mask: true });

    const chunkSize = 10;
    let successCount = 0;

    for (let i = 0; i < initialDishes.length; i += chunkSize) {
      const chunk = initialDishes.slice(i, i + chunkSize);

      // 使用 Promise.all 批量插入这一块
      const promises = chunk.map(dish => collection.add({ data: dish }));
      await Promise.all(promises);

      successCount += chunk.length;
      console.log(`已成功插入 ${successCount} / ${initialDishes.length} 条记录`);

      // 延迟 500ms 避免超时
      if (i + chunkSize < initialDishes.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    wx.hideLoading();
    wx.showToast({ title: '数据初始化成功', icon: 'success' });
    console.log('全部 120 条数据插入完毕！');

  } catch (error) {
    wx.hideLoading();
    wx.showToast({ title: '初始化失败', icon: 'none' });
    console.error('批量插入数据失败：', error);
  }
};
