import ILStyles from "./ImagesList.module.css"


export const ImagesList = ({ingredientsImages}) => {

  return (
    <>
      {ingredientsImages.slice(0, 6).map((item, i) => {
        if (i < 5) {
          return (
            <li key={i} className={ILStyles.imagesList__images} >
              <img className={ILStyles.imagesList__img} src={item} alt={'ингредиент'}/>
            </li>)
        } else {
          return (
            <li key={i} className={`${ILStyles.imagesList__images} ${ILStyles.imagesList__lastImages}`}>
              <img className={`${ILStyles.imagesList__img} ${ILStyles.imagesList__lastImg}`} src={item} alt={'ингредиент'}/>
              {ingredientsImages.length - 6 === 0?null:
                <span className={`${ILStyles.imagesList__counter} text_type_digits-default`}>{`+${ingredientsImages.length - 6}`}</span>
              }
            </li>)
        }
      })}
    </>
  )

}