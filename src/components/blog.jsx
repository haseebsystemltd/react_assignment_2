import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Banner from "./banner";

function Blog() {

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [author, setAuhtor] = useState("");

    let [articles, setArticles] = useState([]);

    const [show, setShow] = useState(false);

    const [formState, setFormState] = useState('');

    const handleClose = () => {
        setTitle('')
        setSubtitle('')
        setAuhtor('')
        setFormState('')
        setShow(false)
    } 

    const handleShow = () => setShow(true);

    function showAddForm() {
        setFormState('add');
        setShow(true);
    }

    function blogFormHandler(e) {
        e.preventDefault();

        let newArticlesList = [...articles];
        if (formState == 'add') {
            newArticlesList.push({
                title: title,
                subTitle: subtitle,
                author: author,
            });         
        }else {
            newArticlesList[formState] = {
                title: title,
                subTitle: subtitle,
                author: author,
            }
        }

        setArticles(newArticlesList);

        setShow(false);
        setTitle('')
        setSubtitle('')
        setAuhtor('')
        setFormState('')
     
    }

    function editArticle(index) {

        setTitle(articles[index].title)
        setSubtitle(articles[index].subTitle)
        setAuhtor(articles[index].author)
        setFormState(index)

        setShow(true);
    }

    function deleteArticle(index) {
        let newArticlesList = [...articles];
        newArticlesList.splice(index, 1);
        setArticles(newArticlesList);

    }

    return (
        <>
            <Banner pageTitle="Blog" />
            <div className="container">
                <Button className="my-4" variant="primary" onClick={showAddForm}>Add Article</Button>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((element, index) => {

                            return (

                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{element.title}</td>
                                    <td>{element.subTitle}</td>
                                    <td>{element.author}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={()=> editArticle(index)}>Edit</button>
                                        <button className="btn btn-danger" onClick={()=> deleteArticle(index)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={blogFormHandler}>
                        <div className="form-group">
                            <label >Title</label>
                            <input
                                type="text"
                                className={`form-control`}
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        <div className="form-group">
                            <label >Subtitle</label>
                            <input
                                type="text"
                                className={`form-control`}
                                name="subtitle"
                                onChange={(e) => setSubtitle(e.target.value)}
                                value={subtitle}
                            />
                        </div>
                        <div className="form-group">
                            <label >Author</label>
                            <input
                                type="text"
                                className={`form-control`}
                                name="author"
                                onChange={(e) => setAuhtor(e.target.value)}
                                value={author}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Blog;