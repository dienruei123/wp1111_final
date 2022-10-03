# Web Programming HW#2

###### Author: b10901038 吳典叡

## Main features

1. Random number of participants between 1 and 16 (myself included, 15 members added)
2. Added remove icon
   - members will be kicked out of Meet if the remove button has triggered.
   - residual members will be well-arranged (HW1 flex)
3. Option buttons(implemented in HW1),while added "unpin" feature(triggers when click over the oval area).
   - Case 1: unpin pinned member
     - remove pinned member and add to members' container, set self container invisible
   - Case 2: pin a member while there's no pinned members
     - set self container visible, and add the member into self container
   - Case 3: pin a member while there's a pinned member currently
     - remove pinned member, add him/her to member's container, and add the member to be pinned into self container
4. When kicked out all members, myself will be filled almost all the window.(90%)

## Addtional features

1. Random number of participants
   - Guaranteed no repeated members
   - When there is full of participants(16 people), system will pop up dialog box to alert the user.
2. Dynamic sizing for the member blocks (sizing() function)
   - Members in the bottom row would be wider if necessary
   - Redesign an arrangement method for member blocks to make it more eye-catching for user.
3. Hightlight the pinned member
   - added pin icon beside member name and change footer's background color
   - member will no longer be highlighted when unpinned
4. Added add-member button, randomly add a member into the Meet(obeys additional feature #1)
5. Show local time
6. Close window by triggering hang-up button
7. Show total number of members(in right of the footer)

## Issues

1. Dynamic sizing may not work well in Responsive Web Design
2. lacks transition effects
3. member options button will be relatively huge when the member block is enough small
