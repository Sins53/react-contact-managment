import "../../Sass/list.scss"
import { MdOutlineDelete, MdModeEditOutline, MdArrowDropDown } from "react-icons/md";


const List = (props) => {
  const {name, email, phone, id, handleDelete, handleUpdate} = props;

  
function showDropdown(){
  console.log('clicked')
  var element = document.getElementById(id);
  element.style.display = (element.style.display === 'none' ? 'block' : 'none' );
}

  return (
    <>
    <div className="list-contact mt-5 ">
      <div className="row text-center">
      <button className='ms-3 col-1' onClick={showDropdown}>
      <MdArrowDropDown />
      </button>
      <div className='list-contact-name col-8'>{name}</div>
      <button className="btn btn-warning m-2 col-1" onClick={handleUpdate}>
      <MdModeEditOutline />
    </button>
    <button className="btn btn-danger m-2 col-1" onClick={handleDelete}>
      <MdOutlineDelete />
    </button>
      </div>
      <div className='list-contact-dropdown text-center pt-3' id={id} style={{display: 'none'}}> 
        <h1>{email}</h1> 
        <h1>{phone}</h1> 
      </div> 
     {/* <div className="list-contact-update" id={id+'-update'} style={{display: 'none'}}>

  </div> */}
    </div>
    </>  
  )
}

export default List