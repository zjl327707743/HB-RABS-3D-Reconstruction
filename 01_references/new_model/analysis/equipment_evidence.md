# M0 - 新生产场景素材分析、关键帧提取与白模基准确认

日期：2026-06-14

状态：已完成素材定位、ffprobe 核验、粗抽帧、定向精抽帧、关键帧筛选、设备证据表、暂定空间/比例基准、现有 Three.js 只读架构调查。未修改 `02_threejs/`，未 commit，未 push，未部署。

## 1. Git 安全检查

| 项目 | 结果 |
| --- | --- |
| 工作目录 | `/Users/zhaojiale/VS Projects/HB-RABS-3D-Reconstruction` |
| 远端 | `origin https://github.com/zjl327707743/HB-RABS-3D-Reconstruction.git` |
| 当前分支 | `feature/v0.7-new-model-page` |
| 重新开始前工作区 | 仅有上一轮 M0 产生的 `01_references/` 未跟踪目录 |
| 本轮限制 | 不 commit、不 push、不部署、不修改动态生产版、桌面物品版或其他 Three.js 场景代码 |

未跟踪内容判断：`01_references/` 属于新生产场景 M0 素材分析输出，不属于旧动态生产版、桌面物品版或其他代码工作。

## 2. 素材与 ffprobe

素材源路径：

```text
00_source_videos/V0.7_videos/
├── file_v3_0012l_211998ca-6c30-4042-8872-77fe5cb1a1eg.mp4
├── 飞书20260614-104336.mp4
└── 圆弯管参考图.png
```

参考图 C 原文件名为 `圆弯管参考图.png`，已复制为：

```text
01_references/new_model/reference_images/reference_c_center_elbow_side.png
```

ffprobe 核验：

| 素材 | 视频编码 | 分辨率 | 标称帧率 | 平均帧率 | 时长 | 帧数 | 文件大小 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 视频 A | h264 | 406 x 720 | 24 fps | `23676000/986501` ≈ 24.0 fps | 328.834 s | 7892 | 45,398,376 bytes |
| 视频 B | h264 | 1280 x 720 | 29 fps | `394000000/13586207` ≈ 29.0 fps | 67.965 s | 1970 | 41,180,219 bytes |

## 3. 抽帧与联系表

粗抽帧：

| 视频 | 策略 | 输出 |
| --- | --- | --- |
| 视频 A | 每 12 秒 1 帧 | `01_references/new_model/frames_overview/video_a_*_overview.jpg` |
| 视频 B | 每 3 秒 1 帧 | `01_references/new_model/frames_overview/video_b_*_overview.jpg` |

定向精抽帧：

| 视频 | 时间段 | 步长 | 目的 |
| --- | --- | --- | --- |
| 视频 A | 00:48-01:12 | 0.5 s | 中央弯管、右侧白色/灰色软管、蓝色接口、底部连接 |
| 视频 A | 03:12-03:36 | 0.5 s | 右侧白色软管更完整露出、与轨道/前景遮挡关系 |
| 视频 B | 00:00-00:18 | 0.5 s | 完整舱体、四个手套孔、底部轨道、圆桶/右侧工位 |
| 视频 B | 00:48-00:57 | 0.5 s | 右侧工位、轨道和前后深度关系补充 |

联系表路径：

```text
01_references/new_model/contact_sheets/video_a_overview_01.jpg
01_references/new_model/contact_sheets/video_a_overview_02.jpg
01_references/new_model/contact_sheets/video_b_overview_01.jpg
01_references/new_model/contact_sheets/video_b_overview_02.jpg
01_references/new_model/contact_sheets/video_a_detail_center_right_pipe_01.jpg
01_references/new_model/contact_sheets/video_a_detail_center_right_pipe_02.jpg
01_references/new_model/contact_sheets/video_a_detail_center_right_pipe_03.jpg
01_references/new_model/contact_sheets/video_a_detail_center_right_pipe_04.jpg
01_references/new_model/contact_sheets/video_a_detail_late_center_right_pipe_01.jpg
01_references/new_model/contact_sheets/video_a_detail_late_center_right_pipe_02.jpg
01_references/new_model/contact_sheets/video_a_detail_late_center_right_pipe_03.jpg
01_references/new_model/contact_sheets/video_a_detail_late_center_right_pipe_04.jpg
01_references/new_model/contact_sheets/video_b_detail_overall_track_01.jpg
01_references/new_model/contact_sheets/video_b_detail_overall_track_02.jpg
01_references/new_model/contact_sheets/video_b_detail_overall_track_03.jpg
01_references/new_model/contact_sheets/video_b_detail_right_side_01.jpg
01_references/new_model/contact_sheets/video_b_detail_right_side_02.jpg
```

## 4. 关键帧

关键帧路径：

```text
01_references/new_model/frames_key/video_b_00m00s_overall_chamber_glove_ports_track.jpg
01_references/new_model/frames_key/video_b_00m03s_four_glove_ports_equal_spacing.jpg
01_references/new_model/frames_key/video_b_00m12s_center_equipment_suction_pipe_track.jpg
01_references/new_model/frames_key/video_b_00m18s_track_drum_and_right_station.jpg
01_references/new_model/frames_key/video_b_00m24s_bottom_front_rear_plates_track.jpg
01_references/new_model/frames_key/video_b_00m48s_white_pipe_overall_and_right_station.jpg
01_references/new_model/frames_key/video_b_00m54s_depth_relationship_track_drum.jpg
01_references/new_model/frames_key/video_a_00m48s_center_elbow_and_white_pipe.jpg
01_references/new_model/frames_key/video_a_01m00s_center_elbow_front_and_bottom_connection.jpg
01_references/new_model/frames_key/video_a_01m12s_right_white_hose_blue_interface.jpg
01_references/new_model/frames_key/video_a_01m24s_center_elbow_side_profile.jpg
01_references/new_model/frames_key/video_a_03m12s_center_elbow_track_and_drum_depth.jpg
01_references/new_model/frames_key/video_a_03m24s_white_pipe_curve_and_interface.jpg
01_references/new_model/frames_key/video_a_03m36s_bottom_connection_and_track_relation.jpg
```

覆盖关系：

| 观察对象 | 主要关键帧 |
| --- | --- |
| 舱体正面整体 | `video_b_00m00s_overall_chamber_glove_ports_track.jpg` |
| 四个手套孔及其间距 | `video_b_00m03s_four_glove_ports_equal_spacing.jpg` |
| 中央弯管正面/斜正面 | `video_a_00m48s_center_elbow_and_white_pipe.jpg` |
| 中央弯管侧面 | `video_a_01m24s_center_elbow_side_profile.jpg`、参考图 C |
| 中央弯管底部连接 | `video_a_01m00s_center_elbow_front_and_bottom_connection.jpg` |
| 左侧悬空吸盘/吊杆 | `video_b_00m12s_center_equipment_suction_pipe_track.jpg` |
| 底部前后金属板 | `video_b_00m24s_bottom_front_rear_plates_track.jpg` |
| 中央轨道 | `video_b_00m18s_track_drum_and_right_station.jpg` |
| 圆桶整体/局部 | `video_b_00m18s_track_drum_and_right_station.jpg`、`video_b_00m54s_depth_relationship_track_drum.jpg` |
| 圆桶和中央装置相对位置 | `video_b_00m12s_center_equipment_suction_pipe_track.jpg`、`video_a_03m12s_center_elbow_track_and_drum_depth.jpg` |
| 右侧白色管道整体 | `video_a_03m24s_white_pipe_curve_and_interface.jpg` |
| 白色管道接口近景 | `video_a_01m12s_right_white_hose_blue_interface.jpg` |
| 前后深度 | `video_b_00m54s_depth_relationship_track_drum.jpg` |

## 5. 设备证据表

| 对象临时名称 | 证据帧 | 左右位置 | 上下位置 | 前后位置 | 基本形状 | 主要材质 | 连接对象 | 相对尺寸 | 确定程度 | 不确定点 | 白模建议 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 四个手套孔 | `video_b_00m00s...`、`video_b_00m03s...` | 前视图中横向四个，等距排列 | 等高，位于底部工作区上方 | 前玻璃面，手套袋向内下垂 | 圆形端口，外圈较厚，内部有软袖/手套袋 | 白色/浅色软袋，金属或硬质端口圈 | 前玻璃、操作手套 | 手套孔直径 = 1.00；中心距约 1.35-1.55 个孔径 | 高 | 手套袋遮挡端口内缘，不能据袋形改变孔径 | 复用等大等高等距四孔；只保留端口圈和基础软袖 |
| 中央不锈钢弯管装置 | `video_a_00m48s...`、`video_a_01m00s...`、`video_a_01m24s...`、`video_a_03m12s...`、参考图 C | 舱体内部中线略偏左/中部，位于右侧白色管道左侧 | 高于轨道和圆桶，底部法兰接近工作区上方 | 位于后壁前方、轨道上方，前方有手套袋遮挡 | 左侧水平大管进入，中央有鼓起/变径罩体，下部为短圆筒/法兰，底部接小弯管/接口 | 抛光或拉丝不锈钢 | 左侧大管、底部接口/透明连接件、右侧管道系统、圆桶工位 | 最大可见宽度约 0.85-1.05 个手套孔直径；主管管径约 0.22-0.30 个孔径 | 高 | 蒸汽遮挡顶部和背部；内部结构不可见 | 用 TubeGeometry 表达水平管和下部弯管，用 LatheGeometry/CylinderGeometry 表达鼓起罩体和法兰；不加内部细节 |
| 左侧悬空吸盘 | `video_b_00m00s...`、`video_b_00m12s...` | 中央弯管左侧/左中区域，约在第 2-3 手套孔后方 | 悬挂在上部设备下方，高于轨道和桶 | 位于前手套袋后方，接近后壁中层 | 圆盘状吸盘，连接竖向/斜向吊杆 | 金属杆 + 浅色圆盘/吸盘 | 吊杆、可能对应桶盖吸取位置 | 吸盘直径约 0.35-0.45 个手套孔直径 | 中 | 被手套袋与玻璃反光遮挡；朝向和完整吊杆不清 | 第一版只建静态下向圆盘 + 简单吊杆；不做吸盖动画 |
| 前侧金属板 | `video_b_00m00s...`、`video_b_00m24s...` | 横跨底部工作区前缘 | 位于手套孔下方、轨道前侧 | 前侧，靠近玻璃/操作者 | 长条板/边梁，前缘深色，局部金属反光 | 深色金属/不锈钢 | 中央轨道、前端框架 | 前板深度约 0.25-0.35 个孔径 | 中 | 手套袋遮挡前板后缘，厚度不明 | 用 BoxGeometry 建前侧板/边梁，保留简化厚度 |
| 后侧金属板 | `video_b_00m12s...`、`video_b_00m24s...` | 横跨底部工作区后侧 | 与前侧金属板同高度或略高 | 后侧，靠近后壁设备 | 长条金属支撑板/后平台 | 不锈钢 | 中央轨道、后壁设备支撑 | 后板可见深度约 0.30-0.45 个孔径 | 中 | 被圆桶、手套袋和设备遮挡，边界不完整 | 用 BoxGeometry 做后侧板，不补不可见支架 |
| 中央轨道 | `video_b_00m00s...`、`video_b_00m18s...`、`video_b_00m54s...` | 位于前后金属板之间，贯穿中部 | 底部工作区表面 | 走向主要沿 Z 方向，向舱体深处延伸 | 多根平行金属滚轴/导轨，形成圆桶输送通道 | 高反光金属 | 圆柱桶、前后板 | 可见轨道通道宽度约 0.65-0.85 个手套孔直径；全轨道区跨多个孔位 | 高 | 滚轮数量和端部机械结构局部被遮挡 | 用若干 CylinderGeometry/BoxGeometry 表达可见平行轨道；不补不可见滚轮机构 |
| 圆柱桶 | `video_b_00m18s...`、`video_b_00m54s...`、`video_a_03m12s...` | 轨道上，偏右/中右，受手套袋遮挡 | 低于中央弯管，高于轨道表面 | 在中央弯管下方/前后对接区域，前后位置约在轨道中段 | 圆柱形金属桶，桶口/桶盖状态不完全清楚 | 不锈钢/金属 | 中央弯管底部接口、右侧白色管道可能连接 | 可见直径约 0.75-0.90 个手套孔直径；高度暂不能可靠量化 | 中 | 被手套袋和前景遮挡；桶口是否打开、是否有桶盖不确定 | 第一版只做一个静止金属圆柱桶；桶口做低细节或暂闭合 |
| 右侧白色管道装置 | `video_a_00m48s...`、`video_a_01m12s...`、`video_a_03m24s...`、`video_b_00m48s...` | 中央弯管右侧，向右侧工位/圆桶方向延伸 | 中高处起弯，接口落到中低处 | 位于中央装置后方到右前方之间，部分贴近前景手套孔 | 白色光滑弯管/软管 + 灰色波纹管 + 蓝色接口 + 金属接头，不应合并为单根光滑管 | 白色塑料/硅胶、灰色波纹软管、蓝色接口、金属快接 | 中央弯管底部/侧部接口、圆桶连接区域、右侧固定端 | 白色软管直径约 0.10-0.15 个手套孔直径；波纹段略粗 | 高 | 固定端和自由端的确切连接点被蒸汽/手套袋遮挡 | 用 CatmullRomCurve3 + TubeGeometry 做白色弯管；灰色波纹段单独建；蓝色/金属接口用 Cylinder/Ring |

低确定度结构不得在下一阶段直接做复杂细节。蒸汽、粉雾、反光、手臂、手套动作、包装袋、无依据支架/传感器/控制箱均不进入第一版白模。

## 6. 空间和比例基准

坐标约定：

```text
X：画面左右方向
Y：垂直高度方向
Z：舱体前后深度方向
```

暂定比例，仅来自视频透视和遮挡下的视觉估算，不是真实工程尺寸：

```text
手套孔直径 = 1.00
手套孔中心距 ≈ 1.35-1.55
圆桶直径 ≈ 0.75-0.90
中央弯管最大可见宽度 ≈ 0.85-1.05
中央不锈钢主管管径 ≈ 0.22-0.30
右侧白色软管管径 ≈ 0.10-0.15
中央轨道通道宽度 ≈ 0.65-0.85
吸盘直径 ≈ 0.35-0.45
```

简易俯视关系图：

```text
Z 后 / 后壁
┌────────────────────────────────────────────────────────────┐
│        左侧悬空吸盘        中央不锈钢弯管        右侧白管固定端 │
│              │              ╭──────╮              ╭─────╮  │
│              ○              │ elbow│──── white/gray hose │  │
│                             ╰──┬───╯              ╰─blue┘  │
│ 后侧金属板  ━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 中央轨道       ║ ║ ║ ║ ║        圆柱桶 / 对接区             │
│ 前侧金属板  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
└────────────────── 前玻璃 / 四个等距手套孔 ─────────────────┘
Z 前
```

简易正视关系图：

```text
Y 上
┌──────────────────────── RABS 金属外框 ─────────────────────┐
│        吊杆/吸盘        中央弯管主体          右侧白色软管   │
│          ○             ╭──────╮              ╭──────╮      │
│                        ╰──┬───╯──接口/波纹段─╯      │      │
│   ○            ○            ○            ○                 │
│        前/后金属板之间：多根平行中央轨道 + 一个圆柱桶        │
└──────────────────────── 底部工作区域 ──────────────────────┘
Y 下
```

## 7. 现有 Three.js 架构调查

只读检查范围：`02_threejs/`

| 项目 | 结果 |
| --- | --- |
| 当前构建工具 | Vite，`02_threejs/package.json` 中 `dev/build/preview` 使用 `vite` |
| Three.js 版本 | `three ^0.170.0` |
| 动态生产版入口 | `02_threejs/index.html` -> `/src/main.js` -> `createRabsSceneApp({ page: "dynamic" })` |
| 桌面物品版入口 | `02_threejs/table-items/index.html` -> `/src/tableItemsPage.js` -> `createRabsSceneApp({ page: "tableItems" })` |
| 多页面配置方式 | `02_threejs/vite.config.js` 中 `rollupOptions.input` 配置 `main` 和 `tableItems` |
| 公共 RABS 舱体代码 | `02_threejs/src/scene/chamber.js`：`createChamberShell`、`createGlassPanels`、`createRearWall` |
| 工作台构建代码 | `02_threejs/src/scene/workbench.js`：当前为整块 `createWorkbench` 和孔点 `createWorkbenchPerforation` |
| 手套孔构建代码 | `02_threejs/src/scene/glovePorts.js`：`createGlovePorts`，基于 `SCENE_SCALE.glovePortXs` 等距布局 |
| 灯光位置 | `02_threejs/src/scene/lights.js`：`createLights` |
| 相机位置 | `02_threejs/src/scene/cameras.js`：`createCamera`、`CAMERA_PRESETS`、`TABLE_ITEMS_CAMERA_PRESETS` |
| OrbitControls 位置 | `02_threejs/src/app/rabsSceneApp.js` 内直接创建 |
| 控制面板和页面导航 | `02_threejs/src/ui/cameraButtons.js`，由 `rabsSceneApp.js` 传入 `pageLinks` |

可直接复用：

```text
createChamberShell
createGlassPanels
createRearWall
createGlovePorts
createLights
createCamera 的基础方式
cameraButtons 的页面导航和相机按钮模式
SCENE_SCALE 中的舱体宽高深、手套孔半径和等距 X 位置
```

必须隔离的旧场景设备：

```text
centerEquipment.js 中的旧漏斗、搅拌/容器、包装袋和动态流动相关对象
rightEquipment.js 中旧阀门、手轮和管接头
pipesBlockout.js 中旧左右水平管和主硬管
airflowMist.js 中的雾/气流
smallParts.js 中桌面物品版的培养皿、工具、包装袋等历史物件
```

未来适合形成的结构：

```text
shared/
├── createRabsShell
├── createWorkArea
├── createGlovePorts
├── createLighting
├── createCamera
└── createSceneNavigation

scenes/
├── dynamic-production
├── table-items
└── new-model
```

其中 `createWorkArea` 需要支持新生产场景的前侧金属板、后侧金属板和中央轨道，不应直接复用当前整块工作台。

## 8. 下一阶段白模顺序

| 顺序 | 步骤 | 建议 Three.js 基础几何体 | 需要自定义曲线的部位 | 暂定位置 | 暂定尺寸 | 证据帧 | 风险点 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 建立新页面空场景 | Scene / Group | 无 | 沿用现有坐标约定 | 无 | 架构调查 | 需隔离旧动态生产版和桌面物品版 |
| 2 | 复用 RABS 公共舱体 | BoxGeometry / TorusGeometry / CylinderGeometry | 无 | 沿用现有舱体坐标 | 沿用现有 `SCENE_SCALE` | `video_b_00m00s...` | 只复用 shell/glass/rear/glove/lights/camera |
| 3 | 建立底部前后金属板 | BoxGeometry | 无 | 工作区底部，前后分离 | 前板深度约 0.25-0.35；后板深度约 0.30-0.45 | `video_b_00m24s...` | 不能继续使用整块工作台表达 |
| 4 | 建立中央轨道 | CylinderGeometry / BoxGeometry | 视轨道端部而定 | 两块金属板之间，沿 Z 方向 | 轨道通道宽约 0.65-0.85 | `video_b_00m18s...` | 不补不可见滚轮或槽钢 |
| 5 | 放置一个圆柱桶 | CylinderGeometry / RingGeometry | 无 | 轨道中右/中段 | 直径约 0.75-0.90，高度待白模微调 | `video_b_00m18s...`、`video_b_00m54s...` | 桶口/桶盖状态不确定，先低细节 |
| 6 | 建立中央弯管主体 | TubeGeometry / CylinderGeometry / LatheGeometry / RingGeometry | 水平管、底部弯管 | 舱体内部中线略偏左，轨道上方 | 最大宽约 0.85-1.05；主管管径约 0.22-0.30 | `video_a_00m48s...`、参考图 C | 蒸汽遮挡顶部，不能补内部 |
| 7 | 建立左侧悬空吸盘 | CylinderGeometry / TorusGeometry / BoxGeometry | 吊杆如有弯折再用 TubeGeometry | 中央装置左侧，后方中高位置 | 吸盘直径约 0.35-0.45 | `video_b_00m12s...` | 朝向/吊杆局部中确定度，第一版只静止 |
| 8 | 建立右侧白色弯管 | TubeGeometry / CatmullRomCurve3 / CylinderGeometry / RingGeometry | 白色软管、灰色波纹管路径 | 中央装置右侧至桶/右侧接口 | 管径约 0.10-0.15 | `video_a_01m12s...`、`video_a_03m24s...` | 白色软管、灰色波纹管、蓝色接口必须分开 |
| 9 | 调整四个手套孔和设备空间关系 | 复用 createGlovePorts | 无 | 前玻璃等高等距 | 手套孔直径 = 1.00 | `video_b_00m03s...` | 不按手套袋下垂形态改孔径 |
| 10 | 输出六个固定视角截图 | Camera presets | 无 | 正面、斜侧、俯视、轨道、中央弯管、右管细节 | 无 | 全部关键帧 | 白模完成后需浏览器截图验证 |

## 9. 当前仍需用户确认的问题

1. 参考图 C 原名为 `圆弯管参考图.png`，本轮已作为中央不锈钢弯管侧面参考使用；请确认这就是任务说明中的 `image.png`。
2. 圆桶桶口/桶盖在关键帧中仍受手套袋遮挡，下一阶段建议先做低细节桶口。
3. 左侧悬空吸盘的吊杆完整形态中确定度，下一阶段只建议静态简化。
4. v0.7 分支当前基于 `feature/v0.6-multi-page-showcase`；如需改从 `main` 派生，需要单独确认。
