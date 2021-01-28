import React from "react";
import { Container } from "../../../components/grid/Container";
import { BaseImage } from "../../../components/BaseImage";
import { BaseText } from "../../../components/BaseText";
import { useUpdateReviewAmountMutation } from "../../../generated/graphql";

interface Props {
  reviewAmount: number | undefined;
}

export const ReviewAmountStepper: React.FC<Props> = ({ reviewAmount }) => {
  const [, updateReviewAmount] = useUpdateReviewAmountMutation();

  const handleReviewAmountDecrease = () => {
    const newReviewAmountValue = reviewAmount! - 1;
    if (newReviewAmountValue) {
      updateReviewAmount({ reviewAmount: newReviewAmountValue });
    }
  };

  return (
    <Container mt={44} isRow isCentered>
      <BaseText isBold fz={18}>
        Highlights per day
      </BaseText>
      <Container isRow isCentered hasNoMargin>
        <BaseImage
          w={24}
          h={24}
          mr={16}
          source={require("../../../assets/chevronLeft.png")}
          onPress={() =>
            updateReviewAmount({
              reviewAmount: reviewAmount! - 1,
            })
          }
        />
        <BaseText isBold fz={18}>
          {reviewAmount}
        </BaseText>
        <BaseImage
          w={24}
          h={24}
          ml={16}
          source={require("../../../assets/chevronRight.png")}
          onPress={() => handleReviewAmountDecrease()}
        />
      </Container>
    </Container>
  );
};
