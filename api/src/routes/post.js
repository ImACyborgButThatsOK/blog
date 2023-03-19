import { Router } from "express";
import connection from "../connection.js";

const router = Router();

router.post("/post", (req, res) => {
    const q = "INSERT INTO posts(`title`,`body`) VALUE(?)";
    const data = [[req.body.title, req.body.body]];

    connection.query(q, data, (err) => {
        if (err) res.status(500).json(err);

        res.status(200).json("Post has been created!");
    });
});

router.get("/post", (_req, res) => {
    const q = "SELECT * FROM posts  ORDER BY idposts DESC";

    connection.query(q, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
    });
});

router.get("/post/:id", (req, res) => {
    const q = "SELECT * FROM posts WHERE idposts=? ";

    connection.query(q, [req.params.id], (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
    });
});

router.delete("/post/:id", (req, res) => {
    const q = "DELETE FROM posts WHERE idposts = ?";
    const data = [req.params.id];

    connection.query(q, data, (err) => {
        if (err) res.status(500).json(err);

        res.status(200).json("Post has been deleted!");
    });
});

router.put("/post/:id", (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const q = "UPDATE posts SET title = ?, body = ? WHERE idposts = ?";

    connection.query(q, [title, body, id], (err) => {
        if (err) res.status(500).json(err);

        res.status(200).json("Post has been updated!");
    });
});

export default router;
