# 建模规则

## 总原则

1. **先大后小**：先建舱体、大设备等主体结构，再建管路、法兰、小零件
2. **先形体后材质**：先用基础几何体（Box、Cylinder、Sphere）塑形，确认比例后再上材质
3. **每轮只改一个区域**：一轮只操作一个对象或一个设备组，不允许全局乱改
4. **已确认区域冻结**：一旦区域通过视觉验收，锁定该区域代码，后续改动需明确说明
5. **所有对象必须有 ID**：每个 Three.js mesh/group 必须挂载稳定 `userData.id`，参照 `object_inventory.md`
6. **所有改动必须记录**：每次建模写入 `modeling_log.md`，说明改了什么、为什么、影响范围

## 对象 ID 规范

- 格式：`{category}_{name}`，如 `chamber_shell`、`center_funnel`
- 必须与 `object_inventory.md` 中的 ID 一致
- 子对象使用 `.` 分隔：`center_funnel.cone`、`center_funnel.outlet`
- ID 同时写入 `mesh.name` 和 `mesh.userData.id`

## 区域分组

| 区域 | ID 前缀 | 说明 |
|------|---------|------|
| 外壳/玻璃 | `chamber_*`, `glass_*` | 舱体结构 |
| 后壁 | `rear_*` | 后壁、端口 |
| 工作台 | `workbench`, `glove_*` | 台面、手套孔 |
| 中央设备 | `center_*` | 漏斗、中央罐体 |
| 右侧设备 | `right_*` | 右侧罐体及设备 |
| 管路 | `tubing_*` | 管路系统 |
| 连接件 | `clamp_*`, `flange_*` | 法兰、卡箍 |
| 小零件 | `tool_*`, `gasket_*` | 工具、垫片 |
| 效果 | `airflow_*`, `light_*` | 粒子、灯光 |

## 坐标系

统一遵循 `coordinate_system.md` 定义。对象放置前必须先确认位置和朝向。

## 代码结构（02_threejs/）

```
02_threejs/
├── index.html            # 入口 HTML
├── main.js               # 主入口：场景、渲染器、相机
├── scene-manager.js      # 场景对象管理
├── objects/              # 每个对象/设备一个文件
│   ├── chamber-shell.js
│   ├── glass-panels.js
│   ├── workbench.js
│   ├── center-equipment.js
│   └── ...
├── materials/            # 共享材质
│   └── base-materials.js
└── utils/
    ├── constants.js      # 颜色、尺寸常量
    └── helpers.js        # 辅助函数
```

## 禁用行为

- 禁止无记录地修改对象位置/尺寸
- 禁止删除已有对象的稳定 ID
- 禁止跨区域批量改动（除非文档明确说明）
- 禁止使用 `scene.children` 遍历代替 ID 查找

## 最后更新

2026-06-10
