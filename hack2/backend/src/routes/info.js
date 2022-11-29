// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from "../models/info"

exports.GetSearch = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const priceFilter = req.query.priceFilter
  const mealFilter = req.query.mealFilter
  const typeFilter = req.query.typeFilter
  const sortBy = req.query.sortBy
  /****************************************/

  // NOTE Hint:
  // use `db.collection.find({condition}).exec(err, data) {...}`
  // When success,
  //   do `res.status(200).send({ message: 'success', contents: ... })`
  // When fail,
  //   do `res.status(403).send({ message: 'error', contents: ... })`

  // TODO Part I-3-a: find the information to all restaurants
  const PriceFilter =
    priceFilter === undefined ? undefined : priceFilter.map((e) => e.length)
  //   console.log(PriceFilter, mealFilter, typeFilter)
  Info.find()
    .sort({ [sortBy]: 1 })
    .exec((err, data) => {
      if (err) {
        // console.log(err)
        res.status(403).send({ message: "error", contents: [] })
      } else {
        console.log(data)
        let Filter = data
        Filter = Filter.filter((e) =>
          PriceFilter === undefined ? true : PriceFilter.includes(e.price)
        )
        // console.log(Filter)
        Filter = Filter.filter((e) =>
          mealFilter === undefined
            ? true
            : e.tag.some((ee) => mealFilter.includes(ee))
        )
        Filter = Filter.filter((e) =>
          typeFilter === undefined
            ? true
            : e.tag.some((ee) => typeFilter.includes(ee))
        )
        res.status(200).send({ message: "success", contents: Filter })
      }
    })

  // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter

  // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.id
  /****************************************/

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  //   if success:
  //   {
  //      message: 'success'
  //      contents: the data to be sent. Hint: A dictionary of the restaruant's information.
  //   }
  //   else:
  //   {
  //      message: 'error'
  //      contents: []
  //   }

  //   console.log(id)
  // TODO Part III-2: find the information to the restaurant with the id that the user reques
  Info.findOne({ id: id }).exec((err, data) => {
    if (!err) {
      res.status(200).send({ message: "success", contents: data })
    } else {
      res.status(403).send({ message: "error", contents: [] })
    }
  })
}
