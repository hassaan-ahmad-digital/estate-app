export const test = (req, res) => {
    const resp = {
        message: "Hello User!!",
    };
    console.log(resp);
    res.json(resp);
};
