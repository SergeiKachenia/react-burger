import React from "react";
import FPStyles from './FeedPage.module.css'
import {OrdersList} from "../../components/OrdersList/OrdersList"
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import {nanoid} from "@reduxjs/toolkit";
import { wsSelector} from "../../services/slice/websocket";
import { useWebSocket } from "../../hooks/wsHook";



export const FeedPage = () => {

  const {feedOrders, wsConnected, total, totalToday} = useSelector(wsSelector);

useWebSocket()
console.log(wsConnected)
console.log(feedOrders)

const filterStatus = (status) => {
  return feedOrders.filter((item) => item.status === status);
}
  return (
    <>
    {feedOrders.length > 0 &&
<main className={`${FPStyles.feedPage__main} mt-10`}>
<h1 className={`${FPStyles.feedPage__title} text text_type_main-large pb-5`}>Лента
          заказов</h1>
        <section className={`${FPStyles.feedPage__feeds} custom-scroll`}>
          {feedOrders &&
            feedOrders.map((item:any) => (

               // @ts-ignore
              <OrdersList key={item._id} order={item} idIngredients={item.ingredients} page='/feed' />
            ))
          }

        </section>
        <section className={FPStyles.feedPage__orderInfo}>
          <div className={FPStyles.feedPage__itemsDone}>
            <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
            <ul className={`${FPStyles.feedPage__list} ${FPStyles.feedPage__color}`}>
              {feedOrders &&
                (filterStatus('done').map((item)=>
                  <li key={nanoid()} className={`${FPStyles.feedPage__item} text text_type_digits-default`}>{item.number}
                  </li>))}
            </ul>
          </div>

          <div className={FPStyles.feedPage__itemsInProgress}>
            <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
            <ul className={FPStyles.feedPage__list}>
              {feedOrders &&
                (filterStatus('pending').map((item)=>
              <li key={nanoid()} className={`${FPStyles.feedPage__item} text text_type_digits-default`}>{item.number}
              </li>))}
            </ul>
          </div>

          <div className={FPStyles.feedPage__totalDone}>
            <h2 className={'text text_type_main-medium'}>Выполнено за все
              время:</h2>
            {total &&
            <span className={`${FPStyles.feedPage__status} text text_type_digits-large`}>{total}</span>}
          </div>
          <div className={FPStyles.feedPage__todayDone}>
            <h2 className={'text text_type_main-medium'}>Выполнено за
              сегодня:</h2>
            {totalToday &&
            <span
              className={`${FPStyles.feedPage__status} text text_type_digits-large`}>{totalToday}</span>}
          </div>
        </section>
        </main>
}
</>
  )
}