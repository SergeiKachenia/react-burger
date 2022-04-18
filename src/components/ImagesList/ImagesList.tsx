import ILStyles from "./ImagesList.module.css"


export const ImagesList = ({ingredientsImages}) => {

  return (
    <>
      {ingredientsImages.slice(0, 6).map((item, i) => {
        if (i < 5) {
          return (
            <li key={i} className={ILStyles.images} >
              <img className={ILStyles.img} src={item} alt={'ингредиент'}/>
            </li>)
        } else {
          return (
            <li key={i} className={`${ILStyles.images} ${ILStyles.last_images}`}>
              <img className={`${ILStyles.img} ${ILStyles.last_img}`} src={item} alt={'ингредиент'}/>
              {ingredientsImages.length - 6 === 0?null:
                <span className={`${ILStyles.over} text_type_digits-default`}>{`+${ingredientsImages.length - 6}`}</span>
              }
            </li>)
        }
      })}
    </>
  )

}