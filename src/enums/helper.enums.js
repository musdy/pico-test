// eslint-disable-next-line import/prefer-default-export
export const REGEX = {
    email: new RegExp(
        // eslint-disable-next-line max-len
        // eslint-disable-next-line no-useless-escape
        // eslint-disable-next-line max-len
        '^(?:(?:[\\w`~!#$%^&*\\-=+;:{}\'|,?\\/]+(?:(?:\\.(?:"(?:\\\\?[\\w`~!#$%^&*\\-=+;:{}\'|,?\\/\\.()<>\\[\\] @]|\\\\"|\\\\\\\\)*"|[\\w`~!#$%^&*\\-=+;:{}\'|,?\\/]+))*\\.[\\w`~!#$%^&*\\-=+;:{}\'|,?\\/]+)?)|(?:"(?:\\\\?[\\w`~!#$%^&*\\-=+;:{}\'|,?\\/\\.()<>\\[\\] @]|\\\\"|\\\\\\\\)+"))@(?:[a-zA-Z\\d\\-]+(?:\\.[a-zA-Z\\d\\-]+)*|\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\])$',
    ),
};
