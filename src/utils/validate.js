/* eslint-disable no-useless-escape */
import { isRequiredField, isEmail, isPassword, isName } from "./validateRules";

export const validate = (values, config) => {
    // создаём объект с ошибками
    const errors = {};

    // проходим циклом по ключам объекта с данными формы
    for (const name in values) {
        /**
         * Получаем объект с описанием правил валидации
         * для конкретного поля
         * Например для email мы получим validationSchema.email
         * или если наглядно:
         * {isRequired: { message: "Электронная ..."}}
         */
        const validationRules = config[name];

        for (const rule in validationRules) {
            /**
             * Получаем объект конкретного правила валидации
             * Например для email получим validationSchema.email.isRequired
             * или если наглядно:
             * { message: "Электронная ..."}
             */
            const { message } = validationRules[rule];
            // Проверяем есть ли ошибка
            const hasError = !validator(rule, values[name]);

            // Если есть ошибка добавляем в объект с ошибками
            // сообщение по ключу
            if (hasError && !errors[name]) {
                errors[name] = message;
                /**
                 * останавливаем внутренний цикл прохода по
                 * правилам валидации, если уже нашли ошибку
                 */
                break;
            }
        }
    }

    // Возвращаем объект
    return errors;
};

/* eslint-disable indent */
const validator = (ruleName, value) => {
    switch (ruleName) {
        case "isRequired": {
            if (typeof value === "boolean") {
                return value;
            } else {
                return isRequiredField(value);
            }
        }
        case "isName": {
            return isName(value);
        }
        case "isEmail":
            return isEmail(value);

        case "isPassword":
            return isPassword(value);

        default:
            return true;
    }
};
