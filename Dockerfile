# Этап 1: Сборка
FROM node:18-alpine AS build

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект (создаётся папка dist или build — зависит от вашего скрипта)
RUN npm run build

# Этап 2: Минимальный образ для запуска
FROM node:18-alpine

WORKDIR /app

# Устанавливаем глобально serve
RUN npm install -g serve

# Копируем результат сборки из первого этапа
# Если у вас папка build, то поменяйте /app/dist на /app/build
COPY --from=build /app/dist . 

EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", ".", "-l", "3000"]
