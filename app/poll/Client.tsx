"use client";

import { getTimeAgo } from "@/utils/common/formatDate";
import Scroll from "../components/scroll/Scroll";
import Question from "./Question";
import { PollQuestionProp } from "@/utils/types/common";

function Client({ markets }: { markets: PollQuestionProp }) {
  const renderQuestions = (data: PollQuestionProp) => {
    const timeAgo = typeof data.createdAt === "string" ? data.createdAt : "";
    return (
      <Question
        id={data.id}
        title={data.title}
        postedBy={"Satashi"}
        createdAt={getTimeAgo(timeAgo)}
        description={data.description}
        questionId={data.questionId}
      />
    );
  };
  return (
    <Scroll
      apiRoute="/api/fetch-poll"
      renderFun={renderQuestions}
      objName="markets"
      layoutStyle="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-20 mt-5"
      initialData={markets}
    />
  );
}
export default Client;
