import {useNavigate} from "react-router-dom";
import {Card, Col, Image} from "react-bootstrap";
import {BOOK_ROUTE} from "../utils/consts";
import star from '../assets/star.png'

const BookItem =  ({book}) => {
    const navigate = useNavigate();
    return(
        <Col md={3} className="mt-3" onClick={()=>navigate(BOOK_ROUTE + '/' + book.id)}>
            <Card style={{width:150, cursor:'pointer'}} bordered = {'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL+'/'+book.img}/>
                <div className='mt-1 text-black-50 d-flex justify-content-between align-items-center'>
                    <div>{book.author_surname} {book.author_name} {book.author_fathername}</div>
                    <div className='d-flex align-items-center'>
                        {book.rating?book.rating:0}
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{book.book_name}</div>
            </Card>
        </Col>
    )
}

export default BookItem;