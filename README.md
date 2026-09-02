# SyllabusFlow

> Turn course codes and course documents into confirmed deadlines and actionable study plans.

SyllabusFlow 是一个面向学生的课程信息整理与学习规划项目。用户可以输入悉尼大学（USYD）课程代码，或者上传 syllabus PDF。系统从可追溯的来源提取课程、作业、考试和截止日期，让用户确认结果，再生成可以编辑和追踪的学习计划。

当前仓库处于 **Foundation / MVP 开发阶段**：前后端基础架构、健康检查、测试和 CI 已建立。第一版外部课程数据源限定为悉尼大学公开的 Unit of Study 和 Unit Outline 页面；数据库、课程代码导入、PDF、AI 结构化提取和学习计划功能将按开发计划逐步实现。

## 项目目标

课程大纲经常包含大量分散信息，学生需要手动寻找：

- 作业名称和评分占比；
- 考试与测验日期；
- 每周课程安排；
- 提交要求和迟交规则；
- 多门课程之间的时间冲突。

有些课程信息已经发布在学校的官方页面，有些信息只存在于教师提供的 syllabus PDF 中。SyllabusFlow 的目标不是替用户做决定，而是把这些信息转化为结构化、可追溯、可确认、可修改的数据，再基于确认后的数据生成学习任务。

## 核心流程

```text
方式 A：输入 USYD 课程代码             方式 B：上传 syllabus PDF
            ↓                                      ↓
读取公开的 Unit / Outline 页面             校验文件并提取文本
            ↓                                      ↓
确定性解析课程、学期和 Assessment        AI 生成结构化课程信息
            └──────────────────┬───────────────────┘
                               ↓
                     Pydantic 校验统一数据结构
                               ↓
                         用户确认或修改
                               ↓
                     保存课程与考核日期
                               ↓
                     生成可编辑的学习计划
```

悉尼大学课程代码导入优先采用网页解析，不让 AI 猜测官方字段。PDF 路径采用 **Prompt + 结构化输出 + 数据校验**。第一版不使用 RAG，也不微调模型，以控制项目范围，并让技术方案与具体任务匹配。

## 当前功能

- [x] React + TypeScript + Vite 前端骨架
- [x] FastAPI 后端骨架
- [x] 前后端健康检查
- [x] 本地开发 CORS 配置
- [x] 自动生成的 FastAPI API 文档
- [x] pytest 后端测试
- [x] Ruff Python 静态检查
- [x] TypeScript 类型检查和 Vite 生产构建
- [x] GitHub Actions CI
- [x] PostgreSQL Docker Compose 基础配置
- [x] 确定悉尼大学为第一版官方课程数据源
- [ ] 数据库模型和迁移
- [ ] 课程 CRUD
- [ ] USYD 课程代码查询、学期选择与导入
- [ ] USYD Unit Outline assessment 解析
- [ ] PDF 上传与文本提取
- [ ] AI 结构化信息提取
- [ ] 统一的来源展示、用户确认和纠错界面
- [ ] 学习计划生成与任务管理
- [ ] 评估集和线上部署

## 系统架构

```text
┌─────────────────────────────────────┐
│ Browser                             │
│ React + TypeScript + Vite           │
│ http://localhost:5173               │
└──────────────────┬──────────────────┘
                   │ HTTP / JSON
┌──────────────────▼──────────────────┐
│ FastAPI                            │
│ http://localhost:8000              │
│                                    │
│ API routes → services → data layer │
└────────┬──────────┬──────────────┬─┘
         │          │              │
┌────────▼──────┐ ┌─▼────────────┐ ┌▼────────────────────┐
│ PostgreSQL    │ │ PDF / AI     │ │ Course source       │
│ SQLAlchemy    │ │ PyMuPDF+LLM  │ │ USYD public pages   │
└───────────────┘ └──────────────┘ └─────────────────────┘
```

前端和后端相互独立：

- React 负责页面、表单、交互和状态展示；
- FastAPI 负责官方课程页面读取、文件、业务逻辑、数据校验、数据库和 AI 调用；
- 两者通过 HTTP API 和 JSON 通信；
- 未来可以替换前端，而不必重写后端业务逻辑。

## 技术栈

| 层级 | 技术 | 作用 |
|---|---|---|
| 前端 | React 19 | 组件化用户界面 |
| 前端语言 | TypeScript | 提前发现类型和数据结构错误 |
| 前端构建 | Vite | 本地开发服务器和生产构建 |
| 后端 | FastAPI | HTTP API 和业务逻辑 |
| 数据校验 | Pydantic | 请求、响应和 AI 输出校验 |
| ORM | SQLAlchemy | Python 数据模型和数据库访问 |
| 数据库 | PostgreSQL | 保存课程、文档和学习任务 |
| PDF | PyMuPDF | 提取 PDF 文本和元数据 |
| 外部请求 | HTTPX | 请求悉尼大学公开课程页面 |
| 网页解析 | Beautiful Soup | 从 Unit 和 Outline 页面提取结构化字段 |
| HTTP | Fetch API | React 调用 FastAPI |
| 测试 | pytest | 后端自动化测试 |
| 代码检查 | Ruff | Python 格式和静态检查 |
| 容器 | Docker Compose | 统一本地和演示环境 |
| CI | GitHub Actions | 自动检查后端并构建前端 |

## 目录结构

```text
syllabus-flow/
├── .github/workflows/ci.yml
├── backend/
│   ├── Dockerfile
│   └── app/
│       ├── main.py
│       ├── api/
│       │   ├── router.py
│       │   └── routes/health.py
│       ├── core/config.py
│       └── services/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
├── tests/unit/test_health.py
├── data/
├── docs/DEVELOPMENT_PLAN.zh-CN.md
├── evals/
├── sample_data/
├── .env.example
├── docker-compose.yml
├── pyproject.toml
└── README.md
```

## 环境要求

- Python 3.12；
- Node.js 24 LTS 和 npm；
- Git；
- Docker Desktop（数据库阶段开始需要）。

## 本地开发

### 1. 进入仓库

```powershell
cd D:\project\syllabus-flow
```

### 2. 创建 Python 虚拟环境

```powershell
python -m venv .venv
```

### 3. 安装后端和开发依赖

```powershell
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -e ".[dev]"
```

### 4. 准备环境变量

```powershell
Copy-Item .env.example .env
```

不要把包含真实密钥的 `.env` 提交到 Git。

### 5. 启动 FastAPI

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload
```

后端地址：

- API：`http://localhost:8000`
- Swagger 文档：`http://localhost:8000/docs`
- 健康检查：`http://localhost:8000/api/health`

### 6. 安装并启动 React 前端

打开第二个终端：

```powershell
cd D:\project\syllabus-flow\frontend
npm install
npm run dev
```

打开：`http://localhost:5173`

点击 **Check API connection**。如果页面显示 `Connected`，说明 React 与 FastAPI 通信正常。

## 质量检查

### 后端代码检查

```powershell
.\.venv\Scripts\python.exe -m ruff check .
```

### 后端测试

```powershell
.\.venv\Scripts\python.exe -m pytest
```

### 前端生产构建

```powershell
cd frontend
npm run build
```

该命令先运行 TypeScript 类型检查，再生成 `frontend/dist` 生产文件。

## Docker

安装 Docker Desktop 后，可以启动完整环境：

```powershell
docker compose up --build
```

Docker 地址：

- React 前端：`http://localhost:3000`
- FastAPI 后端：`http://localhost:8000`
- API 文档：`http://localhost:8000/docs`
- PostgreSQL：`localhost:5432`

关闭服务：

```powershell
docker compose down
```

## 环境变量

| 名称 | 示例 | 用途 |
|---|---|---|
| `APP_ENV` | `development` | 后端运行环境 |
| `APP_NAME` | `SyllabusFlow API` | API 名称 |
| `APP_VERSION` | `0.1.0` | API 版本 |
| `API_PREFIX` | `/api` | API 路径前缀 |
| `CORS_ORIGINS` | `["http://localhost:5173"]` | 允许访问 API 的前端地址 |
| `DATABASE_URL` | `postgresql+psycopg://...` | PostgreSQL 连接地址 |
| `UPLOAD_DIR` | `data/uploads` | PDF 保存目录 |
| `LLM_PROVIDER` | 待选择 | 大模型提供商 |
| `LLM_MODEL` | 待选择 | 模型名称 |
| `LLM_API_KEY` | 不提交 | API 密钥 |
| `VITE_API_BASE_URL` | `http://localhost:8000` | React 调用的后端地址 |

Vite 环境变量会在前端构建时写入浏览器代码，因此不得把任何密钥放在 `VITE_` 开头的变量中。

## API

当前接口：

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/` | 返回项目名称、版本和文档地址 |
| `GET` | `/api/health` | 检查 API 是否可用 |

计划接口：

```text
POST   /api/courses
GET    /api/courses
GET    /api/courses/{course_id}
PATCH  /api/courses/{course_id}
DELETE /api/courses/{course_id}

GET    /api/providers/usyd/units/{unit_code}
GET    /api/providers/usyd/outlines/{outline_id}
POST   /api/courses/import/usyd

POST   /api/documents
GET    /api/documents/{document_id}
POST   /api/documents/{document_id}/extract

GET    /api/study-tasks
PATCH  /api/study-tasks/{task_id}
```

## 数据模型初稿

### Course

- `id`
- `name`
- `code`
- `institution`
- `provider`
- `source_type`
- `source_url`
- `source_year`
- `source_session`
- `last_fetched_at`
- `term`
- `instructor`
- `created_at`

### Document

- `id`
- `course_id`
- `original_filename`
- `storage_path`
- `parse_status`
- `created_at`

### Assessment

- `id`
- `course_id`
- `title`
- `assessment_type`
- `due_at`
- `weight`
- `source_text`
- `source_url`
- `confirmed_by_user`

### StudyTask

- `id`
- `assessment_id`
- `title`
- `planned_for`
- `estimated_minutes`
- `priority`
- `status`

## 悉尼大学课程代码导入

第一版只支持悉尼大学，用户输入类似 `INFO1110` 的课程代码。后端将：

1. 规范化并校验课程代码；
2. 读取 `https://www.sydney.edu.au/units/{UNIT_CODE}`；
3. 提取课程名称、简介、学分、规则和可用学期；
4. 让用户选择具体 Unit Outline；
5. 提取公开的 assessment、due date、评分占比和周计划；
6. 返回来源 URL 和获取时间，等待用户确认后保存。

如果课程不存在、网页结构变化、网络请求失败或 Unit Outline 尚未发布，系统必须给出明确状态，不能生成或猜测日期。第一版只读取无需登录的公开页面，不访问 Sydney Student、Canvas 或其他私有教务数据。请求会设置超时、适度缓存和频率限制，保存的数据始终保留官方来源链接。

## AI 结构化提取策略

第一版不会直接信任模型结果。处理流程为：

1. PyMuPDF 提取课程大纲文本；
2. 后端清理文本并控制输入长度；
3. Prompt 要求模型返回固定 JSON Schema；
4. Pydantic 校验字段类型和必填项；
5. 日期统一转换为明确格式；
6. 页面展示来源文本和提取结果；
7. 用户确认后才写入正式课程数据。

对低置信度、缺失日期和冲突信息进行明确标记，不自动猜测。

## 评估计划

准备 10～20 份不同格式的 syllabus，评估：

- 课程名称准确率；
- 作业识别率；
- 截止日期准确率；
- 考试识别率；
- 平均处理耗时；
- 单份 PDF 的模型调用成本；
- 错误类型和失败案例。

评估数据与说明放在 `evals/`，可公开的示例文件放在 `sample_data/`。

## 安全原则

- API Key 只保存在 `.env` 或部署平台 Secrets；
- `.env` 已被 `.gitignore` 排除；
- 浏览器前端不保存 LLM API Key；
- 上传文件必须校验类型、大小和解析结果；
- 外部网页请求必须设置超时、缓存、频率限制和允许的域名；
- 保存学校公开数据时记录来源 URL 和获取时间；
- 错误响应不返回服务器路径或敏感配置；
- 用户确认前，不把 AI 提取结果视为最终事实。

## 开发路线

### Phase 0：Foundation

- [x] FastAPI 和 React 项目骨架
- [x] 健康检查和 CORS
- [x] Python 测试与前端构建
- [x] Docker 和 CI 基础配置

### Phase 1：Course Data

- [ ] PostgreSQL 数据库连接
- [ ] SQLAlchemy 数据模型
- [ ] Alembic 迁移
- [ ] Course CRUD

### Phase 2A：USYD Course Import

- [ ] USYD provider 与网页请求服务
- [ ] Unit of Study 页面解析
- [ ] Unit Outline 和 assessment 解析
- [ ] 学期选择、来源展示和确认导入
- [ ] HTML fixture、异常情况和接口测试

### Phase 2B：PDF Pipeline

- [ ] PDF 上传和安全校验
- [ ] PyMuPDF 文本提取
- [ ] 文档状态管理
- [ ] 扫描型 PDF 错误提示

### Phase 3：Structured Extraction

- [ ] LLM Provider 接口
- [ ] JSON Schema 输出
- [ ] Pydantic 校验
- [ ] 用户确认与修改页面

### Phase 4：Study Planning

- [ ] Assessment 管理
- [ ] 学习任务拆分
- [ ] 优先级和时间安排
- [ ] 任务状态管理

### Phase 5：Evaluation and Deployment

- [ ] 提取评估集
- [ ] 端到端测试
- [ ] 线上部署
- [ ] 演示视频和面试材料

详细时间表见 `docs/DEVELOPMENT_PLAN.zh-CN.md`。

## 项目状态说明

这是一个持续开发中的求职项目。README 中已完成的功能会标记为 `[x]`，计划中的功能标记为 `[ ]`。在获得真实评估结果前，不宣称未经验证的准确率或性能数据。

## License

本项目使用 MIT License，详见 `LICENSE`。
