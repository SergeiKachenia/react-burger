import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CIstyles from "./ConstructorItem.module.css";
import { useAppDispatch } from "../../index";
import {
  deleteIngredientFromCart,
  dragIngredients,
} from "../../services/slice/ingredients";
import { useDrag, useDrop } from "react-dnd";
import { useRef, FC } from "react";
import { TIngredient } from "../../services/types/data";

interface IConstructorItemProps {
  item: TIngredient;
  type?: "top" | "bottom";
  index: number;
}

const ConstructorItem: FC<IConstructorItemProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "cartIngredient",
    item: () => {
      return { item, index };
    },
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  });

  // @ts-ignore
  const [{ handlerId }, drop] = useDrop({
    accept: "cartIngredient",
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    drop: (item) => {
      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }));
    },
    hover: (item, monitor) => {
      if (!ref.current) return;
      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }));
      // @ts-ignore
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.2 : 1;

  drag(drop(ref));

  return (
    <li
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
      draggable
      className={`${CIstyles.constructor__list} mr-3 mb-4`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(deleteIngredientFromCart(item))}
      />
    </li>
  );
};

export default ConstructorItem;
