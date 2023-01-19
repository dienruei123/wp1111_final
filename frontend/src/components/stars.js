import React from 'react'
import { MdStarHalf, MdStarOutline, MdStar } from "react-icons/md";
import styled from 'styled-components';

const StarsWrapper = styled.div`
    color: gold;
    font-size: large;
`

const Stars = ({ rating, displayScore }) => {
    var list = []
    for (let i = 0; i < Math.floor(rating); i++)
        list.push(1)
    if (Math.floor(rating) !== rating)
        list.push(0.5)
    for (let j = list.length; j < 5; j++)
        list.push(0)
    return (
        <StarsWrapper>
            {list.map((ele, idx) => (
                ele === 1 ? <MdStar key={idx} /> : ele === 0.5 ? <MdStarHalf key={idx} /> : <MdStarOutline key={idx} />
            ))}
            {displayScore ? Math.round(10 * rating) / 10 + "/5" : ""}
        </StarsWrapper>
    )
}
export default Stars