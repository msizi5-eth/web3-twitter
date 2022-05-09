import React from "react";
import "./TweetInFeed.css";
import golf from "../images/golf.png";
import canoe from "../images/canoe.jpeg";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const TweetInFeed = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return (
    <>
      {tweetArr
        ?.map((e) => {
          return (
            <>
              <div className="feedTweet">
                <img
                  src={
                    e.attributes.tweeterPfp
                      ? e.attributes.tweeterPfp
                      : defaultImgs[0]
                  }
                  className="profilePic"
                ></img>
                <div className="completeTweet">
                  <div className="who">
                    {e.attributes.tweeterUserName.slice(0, 6)}
                    <div className="accWhen">
                      {`${e.attributes.tweeterAcc.slice(
                        0,
                        4
                      )}...${e.attributes.tweeterAcc.slice(38)} · 
                          ${e.attributes.createdAt.toLocaleString("en-us", {
                            month: "short",
                          })}  
                          ${e.attributes.createdAt.toLocaleString("en-us", {
                            day: "numeric",
                          })}
                          `}
                    </div>
                  </div>
                  <div className="tweetContent">
                    {e.attributes.tweetTxt}
                    {e.attributes.tweetImg && (
                      <img
                        src={e.attributes.tweetImg}
                        className="tweetImg"
                      ></img>
                    )}
                  </div>
                  <div className="interactions">
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                    </div>
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="star" />
                      12
                    </div>
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="matic" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
        .reverse()}

      {/* <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Jay
            <div className="accWhen">0x42... • 1h</div>
          </div>
          <div className="tweetContent">
            Nice day golfing today... Shot 73 (+2)
            <img src={golf} className="tweetImg"></img>
          </div>
          <div className="interactions>">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Jay Again...
            <div className="accWhen">0x42... • 1h</div>
          </div>
          <div className="tweetContent">
            This was a nervous moment, and the ball was moving extra slow...
            <img src={golf} className="tweetImg"></img>
          </div>
          <div className="interactions>">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Jay, one last time
            <div className="accWhen">0x42... • 1h</div>
          </div>
          <div className="tweetContent">
            Just to make sure it went in, Jay watched it carefully...
            <img src={golf} className="tweetImg"></img>
          </div>
          <div className="interactions>">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default TweetInFeed;
