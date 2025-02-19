import {createEffect, createEvent, createStore} from 'effector'
import {IInfo} from './types.ts'

const BASE_URL = 'http://localhost:3000'

export const fetchInfoFx = createEffect(async () => {
    return await fetch(BASE_URL + '/info')
        .then((res) => res.json())
        .catch((error) => {
            console.log(`Ошибка загрузки ${error}`)
            // Пока что не написан EndPoint на сервере для работы. TODO: написать бекенд
            return {
                name: 'Козлов Максимилиан',
                age: 26,
                description: 'Доброго времени суток, здесь я пытался отобразить некоторые свои наработки связанные с фронтенд и бекенд разработкой. Фронтенд я пишу на стеке React + TypeScript, на бекенде использую NodeJS и Express. Я имею более трех лет коммерческого опыта на двух работах. Первая из них была небольшим стартапом из 5 человек, где выполнял функцию разработчика десктопного приложения, с версткой под телефон, для возможности адаптировать ее под iOS. Работали по методологии Agile. Я был единственным фронтендом, поэтому я выбрал React в связке с Redux-saga, использовал базовое create-react-app. Из интересного была интеграция Yandex-maps и Firebase - сторонних сервисов для авторизации, онлайн чата и построения маршрута из точки А в точку Б. В чате была возможно помимо сообщений отсылать изображения. Я разработал необходимое приложение, пусть и моих навыков тогда не хватало его достаточно оптимизировать. На второй работе же первым моим заданием было перевести страшного старого Франкенштейна на красивый и новый React. Не буду углубляться в подробности, но было принято решение писать с нуля, лишь отталкиваясь от функционала старого приложения. Больше года я разрабатывал его в стеке React + TypeScript + Redux-saga, но в компании оно, видимо, никому не нужно было. Через время меня задействовали в создании UI-kit компании, где я обеими руками был за, мне интересно было разрабатывать то, что прямо внутри компании сразу бы использовалось, а не пылилось где-то. Дальше мне предоставили вертску приложения, которую надо было реализовать на React. Я использовал подход SPA, в стеке React + TypeScript + Redux-saga. На бекенде был NodeJS 8-ой версии. React был изначально 14 версии, но со временем подняли его до 16. Все мои работы писались на функциональных компонентах и новых версиях React. Последний значимый проект я с бекенд разработчиком отправил в релиз и некоторое время его поддерживал, прежде, чем мы разошлись во взглядах с компанией. Сейчас же я нахожусь в поисках нового места работы по самым базовым условиях для Мидл разработчика. Прошлые места выработали во мне навыки самостоятельности и ответственности за сделанную работу, ибо я был единственным фронтенд-разработчиком и всё ложилсоь на мои плечи.',
                tech: ['JavaScript, ', 'React, ', 'Docker, ', 'Eslint, ', 'TypeScript, ', 'Effector '],
            }
        })
})

// store
export const $info = createStore<IInfo>({} as IInfo)
// action
export const infoChanged = createEvent<IInfo>()
// reducer
$info.on(infoChanged, (_, payload) => payload)
// fetch / dispatch
fetchInfoFx.done.watch(({result}) => {
    console.log(result)
    infoChanged(result)
})
