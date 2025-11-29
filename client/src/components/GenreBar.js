import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {login} from "../http/clientAPI";

const GenreBar = observer(() => {
    const {book} = useContext(Context);

    return(
        <ListGroup>
            {book.getGenres().map(genre =>
                <ListGroup.Item
                    style = {{cursor:'pointer'}}
                    active={genre.id === book.getSelectedGenre().id}
                    onClick={() => {book.setSelectedGenre(genre)}}
                    key = {genre.id}>
                    {genre.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default GenreBar;

