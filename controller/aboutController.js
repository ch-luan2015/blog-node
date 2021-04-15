app.get('/about', async (req, res) => {

    const fetchIdols = async () => {
        let temp = await Idols.find({}).exec()
        return temp;
    }

    var IdolsData = await fetchIdols();

    const fetchStar = async () => {
        let temp = await UsList.find({}).exec();
        return temp;
    }

    var StarData = await fetchStar();


    res.render('about', {
        IdolsData, StarData

    });
})
