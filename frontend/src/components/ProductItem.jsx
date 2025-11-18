import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const ProductItem = (props) => {
  const { currency } = useContext(ShopContext);
  // support both old product shape and new item shape
  const id = props._id || props.id || props._id;
  const title = props.name || props.title || "Untitled";
  const price = props.price || 0;
  const images = props.image || props.images || [];
  const owner = props.owner || props.user || null;
  const remarks = props.remarks || '';

  // image handling: if image is a relative path (/uploads/...), let browser resolve it; if it's an object, try .url
  let src = assets.hero_img;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (typeof first === 'string') src = first;
    else if (first && typeof first === 'object' && first.url) src = first.url;
  }

  return (
    <Link onClick={()=>scrollTo(0,0)} to={`/product/${id}`} className='block'>
      <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden'>
        <div className='overflow-hidden bg-gray-200 h-48'>
          <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out duration-300' src={src} alt={title} />
        </div>
        <div className='p-4'>
          <p className='font-bold text-lg line-clamp-2 mb-1'>{title}</p>
          <p className='text-2xl font-bold text-blue-600 mb-2'>${price}</p>
          {owner && owner.name && <p className='text-xs text-gray-600 mb-1'>By: {owner.name}</p>}
          {remarks && <p className='text-xs text-gray-500 italic line-clamp-1'>{remarks}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
