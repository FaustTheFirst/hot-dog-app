# hot-dog-app

# Содержание:
1. [Стек технологий](#Стек-технологий)
2. [Установка](#Установка)
3. [Развёртывание](#Развёртывание)
4. [Структура проекта](#Структура-проекта)
5. [Валидация данных](#Валидация-данных)


# Стек технологий
## Сервер:
1. Node
2. Express
3. Objection
4. Knex
5. Pg
6. Dotenv
7. Cors
8. Eslint
9. Nodemon

## Клиент:
1. Create react app
2. Redux toolkit
3. React redux
4. Connected react router
5. Redux logger
6. Prop types
7. Semantic UI react
8. Semantic UI CSS
9. Axios
10. History
11. Moment

## База данных:
PostgreSQL

# Установка:
Перед установкой необходимо установить **PostgreSQL** и создать в ней пустую базу данных для проекта.

## Сервер:
1. В корневом каталоге выполнить команду:
```
npm i
```
2. Создать файл `.env` и добавить в него переменные согласно `.env.example`.
Примечание: Выбраный порт для сервера нужно установить вручную на клиенте в файле: `./client/src/utils/requestHelper.js` (по умолчанию порт 3000).
3. Выполнить миграцию таблицы в базу данных с помощью команды:
```
npx knex migrate:latest --esm
```
4. Для запуска сервера выполнить:
```
npm run dev
```

## Клиент:
1. Перейти в каталог `client` и выполнить команду:
```
npm i
```
2. Как и для сервера, создать файл `.env` и добавить в него переменные согласно `.env.example`
3. Для запуска клиента выполнить:
```
npm start
```

# Развёртывание
Приложеные было развёрнуто на [Elasticbeanstalk](https://aws.amazon.com/ru/elasticbeanstalk/) (само приложение) и [RDS](https://aws.amazon.com/ru/rds/) (база данных). Загрузка репозитория на сервер осуществлялась с помощью [EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html).
1. С помощью консоли **AWS** создать новое окружение в **Elasticbeanstalk**, а также новую БД в **RDS**
2. В настройках окружения добавить переменные окружения для доступа в БД.
3. Также, для доступа сервера в БД необходимо нстроить правила безопасности (**EC2/security groups**).
4. В корневом каталоге проекта выполнить:
```
eb init
```
и выбрать созданное окружение.
5. Перед загрузкой репозитория необходимо в каталоге `client` выполнить:
```
npm run build
```
Эти изменения необходимо закоммитить.
6. Для загрузки репозитория выполнить:
```
eb deploy
```

# Структура проекта
## Краткое описание
Структура проекта, по большому счёту, обусловлена спецификой деплоя на **EB**: поскольку в процессе деплоя **EB** по умолчанию запускает команду `npm install` для установки зависимостей проекта и `npm start` для запуска сервера, основные конфигурационные файлы находятся в корневом каталоге, а основной код сервера может быть безопасно размещён в отдельный каталог.

Также, в отдельной папке находится весь код клиента. Клиент создан с помощью `create-react-app`. Несмотря на то, что **CRA** имеет встроенный **Eslint**, дополнительные пакеты с ним были установлены для того, чтобы использовать с [расширением](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) в **VSCode**.

С пакетом, использованом на клиенте, **semantic-ui-react**, есть нерешённая проблема, описанная в [Semantic-Org/Semantic-UI-React#3819.](https://github.com/Semantic-Org/Semantic-UI-React/issues/3819). Поэтому во время разработки в консоль выводится предупреждение про использование устаревшего API `ReactDOM.findDOMNode()`.

Сервер использует билд клиента как статику, а поскольку команда `npm install` выполняется только для сервера, необходимо убрать с `.gitignore` папку `build` и, соответственно, ребилдить и коммитить изменения на клиенте.

Миграции таблиц в БД происходит автоматически на старте сервера.

Даное решение является, на мой взгляд, простым и быстрым, хотя, безусловно, есть более правильные решения для построения проекта для деплоя на **EB**.

## Сервер
- `api`
  - `midllewares` - содержит обработчики ошибок на сервере;
  - `routes` - основные маршруты сервера;
  - `services` - посредник между маршрутами и запросами в БД;
- `database`
  - `migrations` - миграции в БД;
  - `models` - определяет правила запросов в БД, в том числе валидацию согласно [jsonSchema](https://json-schema.org/);
  - `repositories` - конструктор запросов в БД;

## Клиент
- `assets` - несколько изображений, используемых в приложении независимо от статики в папке `public`;
- `Components` - содержит stateless-компоненты;
- `Containers` - содержит компоненты, использующие **redux store**;
- `helpers` - содержит функции валидации пользовательского ввода, а также массивы параметров для кнопок, в зависимости от типа модального окна;
- `Pages` - основные страницы приложения;
- `state` - основная логика работы с **redux store**;
- `utils` - конструктор запросов с клиента на сервер.

# Валидация данных
Валидация проводится как на клиенте, так и на сервере, независимо друг от друга.

На клиенте валидация проводится во время пользовательского ввода в одном из полей, когда фокус с этого поля убирается, а также полная валидация перед отправкой на сервер (по нажатию кнопок `create/update`). Дополнительно для поля `name` проверяется уникальность имени - когда фокус с этого поля убирается, происходит запрос на сервер на проверку уникальности. Если хотя б одно поле не прошло валидацию, то запрос на сервер отправлен не будет.

На сервере дополнительно происходит валидация данных непосредственно во время запроса в БД с помощью [jsonSchema](https://json-schema.org/). Если валидация не прошла - запрос отклоняется и выбрасывается соответствующая ошибка.

## Правила валидации
- `name`:
  - должно присутствовать;
  - должно быть строкой;
  - от 3 до 16 символов;
  - должно быть уникальным;
- `price`:
  - должно присутствовать;
  - должно быть числом;
  - больше 0 и меньше-равно 100;
  - не более двух знаков после запятой;
- `image`:
  - может быть **null**;
  - если не пустое, должно быть строкой;
  - если не пустое, должно быть валидным **URL**;
  - не более 128 символов;
- `description`:
  - может быть **null**;
  - если не пустое, должно быть строкой;
  - не более 128 символов;

