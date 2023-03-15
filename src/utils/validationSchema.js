import { object, string } from "yup";
export const yupValidationSingIn = object({
    password: string().matches(
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
        "Пароль должен быть не менее 8 символов, содержать (A-z, 0-9) и один из символов (!#$%&?)"
    ),
    email: string()
        .required("Электронная почта обязательна для заполнения")
        .email("Электронная почта заполнена некорректно")
});

export const validationSchema = {
    name: {
        isRequired: {
            message: "Имя обязательно для заполнения"
        }
    },
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Электронная почта заполнена некорректно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        isPassword: {
            message:
                "Пароль должен быть не менее 8 символов, содержать (A-z, 0-9) и один из символов (!#$%&?)"
        }
    },
    profession: {
        isRequired: {
            message: "Пожалуйста выберите профессию"
        }
    },
    licence: {
        isRequired: {
            message: "Пожалуйста примите лицензионное соглашение"
        }
    },
    content: {
        isRequired: {
            message: "Нельзя отправить пустой комментарий"
        }
    }
};
