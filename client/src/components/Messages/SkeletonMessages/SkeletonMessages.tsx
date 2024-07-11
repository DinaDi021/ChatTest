import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";

const SkeletonMessages: FC = () => {
  return (
    <Stack spacing={1}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "10px 15px",
        }}
      >
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          style={{ marginRight: "7px" }}
        />
        <div>
          <Skeleton variant="rounded" width={180} height={40} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "10px 15px",
          flexDirection: "row-reverse",
        }}
      >
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          style={{ marginLeft: "7px" }}
        />
        <div>
          <Skeleton variant="rounded" width={180} height={40} />
        </div>
      </div>
    </Stack>
  );
};

export { SkeletonMessages };
