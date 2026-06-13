# 对象清单

## 说明

- **ID**：唯一标识符，代码中通过 `userData.id` 引用
- **区域**：所属空间区域分组
- **状态**：planned（待建模）、in_progress（建模中）、confirmed（已验收冻结）
- **优先级**：P0（基础结构）> P1（核心设备）> P2（管路连接）> P3（细节零件）> P4（效果增强）

## 对象列表

### 舱体结构

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `chamber_shell` | 舱体外壳 | 外壳 | RABS 舱体主体外框结构 | draft_v0.2 | P0 |
| `glass_panels` | 玻璃面板 | 外壳 | 舱体前/侧面玻璃观察窗 | draft_v0.2 | P0 |
| `rear_wall` | 后壁 | 后壁 | 舱体后壁面板 | draft_v0.2 | P0 |
| `chamber_frame` | 结构框架 | 外壳 | 不锈钢框架、立柱 | planned | P0 |

### 工作台区域

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `workbench` | 工作台面 | 工作台 | 操作台面主体 | draft_v0.2 | P0 |
| `glove_ports` | 手套孔 | 工作台 | 4 个等大、等距、同高的前面板手套孔/端口环 | draft_v0.2.1 | P1 |

### 中央设备

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `top_assembly_blockout` | 顶部总成占位 | 中央设备 | 已移除共享大圆盘，保留黑色中心块和轻量横杆 | draft_v0.5.x | P1 |
| `top_shared_large_round_cover` | 已弃用顶部共享大圆盖 | 中央设备 | 旧的单个大圆盘顶部结构已停用，不再显示 | deprecated_no_display | P1 |
| `top_black_center_block` | 顶部黑色中心块 | 中央设备 | 顶部总成上的黑色矩形遮挡块 | draft_v0.4 | P1 |
| `center_funnel_pair` | 中央双漏斗占位 | 中央设备 | 顶部两个不锈钢漏斗、厚上口、短颈和粗略卡箍环 | draft_v0.4 | P1 |
| `upper_inlet_pipe_pair` | 上接硬管组 | 中央设备 | 双漏斗上方左右两个独立加粗不锈钢上接结构，带各自短法兰 | draft_v0.5.x | P1 |
| `upper_inlet_pipe_left` | 左上接硬管 | 中央设备 | 左漏斗上方独立粗上接管 | draft_v0.5.x | P1 |
| `upper_inlet_pipe_right` | 右上接硬管 | 中央设备 | 右漏斗上方独立粗上接管 | draft_v0.5.x | P1 |
| `center_funnel` | 中央漏斗 | 中央设备 | 加料漏斗主体 | planned | P1 |
| `center_vessel` | 中央罐体 | 中央设备 | 中央处理罐/容器 blockout，当前唯一主圆筒罐体 | draft_v0.4 | P1 |
| `center_vessel_lid_stack` | 中央罐盖层 | 中央设备 | 多层上盖和中心短立管/小接口 | draft_v0.4 | P1 |
| `center_vessel_flange_ring` | 中央罐法兰环 | 中央设备 | 中央主罐体上盖周围粗略法兰环 | draft_v0.4 | P1 |
| `center_vessel_clamp_blocks` | 中央罐卡箍块 | 中央设备 | 中央主罐体上盖周围 6 个粗略卡箍块 | draft_v0.4 | P2 |

### 右侧设备

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `right_vessel` | 右侧罐体 | 右侧设备 | v0.3 误建对象；v0.3.1 已从场景停用 | removed_or_deprecated_v0.3.1 | P1 |
| `right_horizontal_pipe_blockout` | 右侧横向管路 | 右侧设备 | 右侧横向阀门管保持上盖/法兰高度，Z 位收回到接近主体平面 | draft_v0.5.x | P1 |
| `right_black_handwheel` | 右侧黑色手轮 | 右侧设备 | 右侧黑色手轮随横向管保持上盖/法兰高度，取消明显前移 | draft_v0.5.x | P1 |
| `right_pipe_couplings` | 右侧管路接头 | 右侧设备 | 内侧必要接头随阀门管上移，外侧接头已删除 | draft_v0.5.x | P2 |

### 左侧设备

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `left_horizontal_pipe_blockout` | 左侧横向管路 | 左侧设备 | 左侧横向阀门管保持上盖/法兰高度，Z 位收回到接近主体平面 | draft_v0.5.x | P1 |
| `left_black_handwheel` | 左侧黑色手轮 | 左侧设备 | 左侧黑色手轮随横向管保持上盖/法兰高度，取消明显前移 | draft_v0.5.x | P1 |

### 侧门/传递小门

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `left_lift_door_panel` | 左侧升降小门板 | 侧壁 | 左侧侧壁中下部浅灰/半透明传递小门板 | draft_v0.5 | P2 |
| `right_lift_door_panel` | 右侧升降小门板 | 侧壁 | 右侧侧壁中下部浅灰/半透明传递小门板 | draft_v0.5 | P2 |
| `left_lift_door_frame` | 左侧升降小门框 | 侧壁 | 左侧传递小门深灰金属边框 | draft_v0.5 | P2 |
| `right_lift_door_frame` | 右侧升降小门框 | 侧壁 | 右侧传递小门深灰金属边框 | draft_v0.5 | P2 |
| `left_lift_door_guide_rails` | 左侧升降小门导轨 | 侧壁 | 左侧传递小门竖向导轨 | draft_v0.5 | P2 |
| `right_lift_door_guide_rails` | 右侧升降小门导轨 | 侧壁 | 右侧传递小门竖向导轨 | draft_v0.5 | P2 |

### 后壁与端口

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `rear_ports_blockout` | 后壁端口占位 | 后壁 | 后壁圆形端口占位已停用，背板保持干净 | deprecated_no_display | P2 |
| `rear_white_disc` | 后壁白色圆片 | 后壁 | 后壁白色圆片已停用 | deprecated_no_display | P2 |
| `rear_right_corrugated_hose_blockout` | 后壁右上褶皱软管 | 后壁 | 后壁软管占位已停用以保持背板干净 | deprecated_no_display | P2 |
| `rear_ports` | 后壁端口 | 后壁 | 后壁管路接口/端口 | planned | P2 |

### 管路系统

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `main_tubing_blockout` | 主要管路占位 | 管路 | 现在包含左右两根漏斗下方不锈钢硬弯管 | draft_v0.5.x | P2 |
| `funnel_lower_hard_pipe_left` | 左漏斗下方硬管 | 管路 | 连续一体 TubeGeometry，漏斗底部已加短金属连接套筒覆盖缝隙 | draft_v0.5.x | P2 |
| `funnel_lower_hard_pipe_right` | 右漏斗下方硬管 | 管路 | 连续一体 TubeGeometry，漏斗底部已加短金属连接套筒覆盖缝隙 | draft_v0.5.x | P2 |
| `left_white_hose_blockout` | 左侧白色软管 | 管路 | 左阀门外侧延伸白管已删除/停用，不再显示 | deprecated_no_display | P2 |
| `right_white_hose_blockout` | 右侧白色软管 | 管路 | 右阀门外侧延伸白管已删除/停用，不再显示 | deprecated_no_display | P2 |
| `tubing_system` | 管路系统 | 管路 | 各类管路、管道 | planned | P2 |
| `clamps_flanges` | 法兰卡箍 | 连接件 | 已补充中间金属漏斗下方连接口卡箍环/扣块，以及软管下端入罐连接卡箍；其它法兰卡箍继续细化 | draft_v0.5.2 | P2 |

### 小零件与工具

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `small_tools` | 小型工具 | 小零件 | 操作工具、手持器具 | planned | P3 |
| `gaskets` | 垫片 | 小零件 | 已补充漂浮白色极薄圆片垫片，外径保持、内孔放大、环带变窄 | draft_v0.5.2 | P3 |
| `floating_tweezer_gasket` | 镊子与白色垫片透明包装 | 小零件 | 白色薄片垫片和镊子分别置于各自完整透明无菌包装内 | draft_v0.5.2 | P3 |
| `small_static_parts` | 静态小件组 | 小零件 | 静态垫片、培养皿/盖、蓝色无菌垫、金属零件、卡箍、扳手 | final_draft_v0.5 | P3 |
| `static_pad_disc` | 静态白色垫片 | 小零件 | v0.5 因出现在左侧卡箍前方而删除/隐藏 | removed_or_hidden_v0.5 | P3 |
| `static_dish` | 静态培养皿 | 小零件 | 右后打孔区静态培养皿/浅圆盘，含淡黄色内容物 | final_draft_v0.5 | P3 |
| `static_dish_lid` | 静态培养皿盖 | 小零件 | 右后打孔区透明浅圆环/透明盖子 | final_draft_v0.5 | P3 |
| `blue_sterile_wrap` | 蓝色无菌垫 | 小零件 | 主罐体右侧、培养皿左侧的浅蓝半透明折叠薄片 | final_draft_v0.5 | P3 |
| `small_metal_funnel_part` | 小金属漏斗零件 | 小零件 | 蓝色无菌垫上的躺放/倾斜金属漏斗形零件 | final_draft_v0.5 | P3 |
| `loose_connector_part` | 松散接头零件 | 小零件 | 蓝色无菌垫附近的小型金属连接环 | final_draft_v0.5 | P3 |
| `left_loose_clamp` | 左侧松散卡箍 | 小零件 | 主罐体左侧下部/法兰附近的金属卡箍 | final_draft_v0.5 | P3 |
| `static_wrench_blockout` | 静态扳手 | 小零件 | 右侧工作台小台上的放大版简化扳手 | final_draft_v0.5 | P3 |

### 效果增强

| ID | 名称 | 区域 | 描述 | 状态 | 优先级 |
|----|------|------|------|------|--------|
| `airflow_smoke` | 气流烟雾 | 效果 | 气流可视化效果 | planned | P4 |
| `airflow_mist_planes` | 静态雾片 | 效果 | 更低透明度静态雾片/雾带，不是粒子系统 | final_draft_v0.5 | P4 |
| `lights_camera` | 灯光摄像机 | 效果 | 场景灯光 + 默认相机 | draft_v0.2 | P0 |

## 统计

| 总数 | planned | draft_v0.2 | draft_v0.2.1 | draft_v0.4 | draft_v0.5 | draft_v0.5.x | final_draft_v0.5 | removed_or_deprecated_v0.3.1 | removed_or_hidden_v0.5 | deprecated_no_display | in_progress | confirmed |
|------|---------|------------|--------------|------------|------------|--------------|------------------|-------------------------------|------------------------|-----------------------|-------------|-----------|
| 54 | 8 | 5 | 1 | 15 | 6 | 6 | 9 | 1 | 1 | 2 | 0 | 0 |

## v0.2 备注

- `chamber_shell` 在代码中包含基础不锈钢框架、立柱、侧向基础玻璃/边框；未单独创建 `chamber_frame` 对象 ID。
- 本轮未创建中央漏斗、中央罐体、右侧罐体、复杂管路、卡箍、小工具或烟雾气流。
- v0.2 对象仍为 draft，不标记 confirmed，下一步应进入 v0.2 review。

## v0.2.1 备注

- 人工视觉审查发现 v0.2 手套孔逻辑错误：不应存在大小不同的主孔/辅助孔，也不应有上方辅助孔。
- `glove_ports` 已修正为 4 个等大、等距、同高的孔：
  - `glove_port_01`：中心 `(-3.3, 1.08, frontGlassZ + 0.06)`，半径 `0.55`
  - `glove_port_02`：中心 `(-1.1, 1.08, frontGlassZ + 0.06)`，半径 `0.55`
  - `glove_port_03`：中心 `(1.1, 1.08, frontGlassZ + 0.06)`，半径 `0.55`
  - `glove_port_04`：中心 `(3.3, 1.08, frontGlassZ + 0.06)`，半径 `0.55`
- `glove_ports` 状态更新为 `draft_v0.2.1`，不标记 confirmed。
- 本轮未新增任何中央设备、罐体、管路、小工具或烟雾。

## v0.3 备注

- 新增主要生产设备 blockout：`center_funnel_pair`、`center_vessel`、`right_vessel`、`right_black_handwheel`、`main_tubing_blockout`、`rear_ports_blockout`。
- 这些对象均为 `draft_v0.3`，只用于位置、比例、前后关系校准。
- 未创建小工具、垫片、培养皿、人物、手臂、烟雾或精细结构。
- v0.2.1 手套孔布局未修改，仍为四个等大、等高、等距孔。

## v0.3.1 备注

- 人工视觉审查指出 v0.3 的 `right_vessel` 结构错误；右侧不应为独立圆筒罐体。
- `right_vessel` 已从场景停用，仅在注册表和清单中保留为 `removed_or_deprecated_v0.3.1` 以便追溯。
- 新增/重构左右横向阀门管线：`left_horizontal_pipe_blockout`、`right_horizontal_pipe_blockout`、`left_black_handwheel`、`right_black_handwheel`、`right_pipe_couplings`、`left_white_hose_blockout`、`right_white_hose_blockout`。
- `center_vessel` 保留为唯一主圆筒罐体；`main_tubing_blockout` 修正为左右漏斗下颈分别连接到左右横向阀门管线。
- v0.2.1 手套孔布局未修改，仍为四个等大、等高、等距孔。

## v0.4 备注

- v0.4 将主体设备从 blockout 提升到展示草稿：顶部总成、双漏斗、中央唯一主罐体、左右管线手轮、后壁、工作台小件、静态雾片均已增强为 `draft_v0.4`。
- `right_vessel` 保持 `removed_or_deprecated_v0.3.1`，未重新显示；v0.2.1 四手套孔未修改。
- 本轮没有添加人物、手臂、动作类表现、复杂烟雾粒子或螺丝级精细结构。

## v0.5 备注

- v0.5 聚焦最终视觉纠偏：培养皿/盖移动到右后打孔区，新增蓝色无菌垫、金属漏斗零件、松散接头和左侧金属卡箍。
- 扳手与小方形台已适度放大；工作台中后部/右侧打孔增强；雾片与玻璃透明度调低。
- `right_vessel` 保持 `removed_or_deprecated_v0.3.1`，v0.2.1 四手套孔未修改；未添加人物、手臂、动作或粒子烟雾。
- v0.5 收尾修正新增左右侧静态升降/传递小门，删除左侧卡箍前白色圆片，并移除白色软管多余小环纹。
- v0.5.x 管路结构纠偏新增双漏斗上方两根上接硬管；左右阀门外侧白管已停用；漏斗下方两根管改为黑灰硬质弯管。
- 2026-06-11 真实性纠偏：后壁圆形端口/圆片停用，顶部共享大圆盘移除，漏斗上下连接改为更接近参考图的独立不锈钢硬管结构。

## 最后更新

2026-06-10
