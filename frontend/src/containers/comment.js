import React from "react"
import "./css/eventPage.css"
import ReactStars from "react-rating-stars-component"
import { useState, useEffect } from "react"
import Stars from "../components/stars"
import { Paper } from "@mui/material"
import { Grid } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import imgLink from "../eventPictures/2023_NEW-YORK.jpg"
const Comment = ({ username, eventId, comments, setLoad, addComment }) => {
  const [stars, setStars] = useState(0)
  const [body, setBody] = useState("")

  const submitComment = async () => {
    if (body && stars) {
      //   setComments([
      //     ...comments,
      //     {
      //       eventId: eventId,
      //       name: name,
      //       rating: rating,
      //       content: content,
      //     },
      //   ])
      const { data } = await addComment({
        variables: {
          eventId: eventId,
          sender: username || "Anonymous",
          stars: stars,
          body: body,
          createdAt: new Date().getTime().toString(),
        },
      })
      console.log(data)

      setBody("")
      setStars(0)
    }
  }

  const showPostedTime = (time) => {
    const nowTime = new Date().getTime()
    const postedTime = parseInt(time)
    const elapsedTime = nowTime - postedTime
    if (elapsedTime > 31536000000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 31536000000) +
        (Math.floor(elapsedTime / 31536000000) === 1
          ? " year ago"
          : " years ago")
      )
    }
    if (elapsedTime > 2592000000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 2592000000) +
        (Math.floor(elapsedTime / 2592000000) === 1
          ? " month ago"
          : " months ago")
      )
    }
    if (elapsedTime > 604800000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 604800000) +
        (Math.floor(elapsedTime / 604800000) === 1 ? " week ago" : " weeks ago")
      )
    }
    if (elapsedTime > 86400000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 86400000) +
        (Math.floor(elapsedTime / 86400000) === 1 ? " day ago" : " days ago")
      )
    }
    if (elapsedTime > 3600000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 3600000) +
        (Math.floor(elapsedTime / 3600000) === 1 ? " hour ago" : " hours ago")
      )
    }
    if (elapsedTime > 60000) {
      return (
        "Posted " +
        Math.floor(elapsedTime / 60000) +
        (Math.floor(elapsedTime / 60000) === 1 ? " minute ago" : " minutes ago")
      )
    } else {
      return "Posted just now"
    }
  }

  return (
    <div className="commentContainer">
      <div className="inputContainer">
        <div className="title">
          <div className="fields">
            <ReactStars
              key={`stars_${stars}`}
              count={5}
              onChange={(e) => setStars(e)}
              size={18}
              activeColor="#ffd700"
            />
          </div>
          <div className="submit">
            <button onClick={submitComment} disabled={!(body && stars)}>
              Submit
            </button>
          </div>
        </div>
        <textarea
          className="content"
          placeholder="Type your comment"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>

      <div className="comments">
        {comments.map((comment) => (
          <Paper style={{ padding: "30px 15px" }} key={comment.id}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt={comment.sender} src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {comment.sender}
                  </h4>
                  <Stars rating={comment.stars} displayScore={false} />
                </div>
                <p style={{ textAlign: "left" }}>{comment.body} </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  {showPostedTime(comment.createdAt)}
                </p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </div>
  )
}
export default Comment
