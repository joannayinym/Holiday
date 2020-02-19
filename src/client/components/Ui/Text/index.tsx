import React, { ReactNode } from "react";
import ReactPlaceholder from "react-placeholder/lib";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { typography as TypographyValues } from "../../Home/themes/typography";

interface IPlaceHolder {
  height?: string | number;
  width?: string | number;
  loading: boolean;
  rows?: number;
  color?: string;
}

interface IProps extends TypographyProps {
  placeHolder?: IPlaceHolder;
  children: ReactNode;
}

const TextInner = ({ placeHolder, children, ...typographyProps }: IProps) => {
  if (!placeHolder) {
    return <Typography {...typographyProps}>{children}</Typography>;
  }

  const { width, height, loading, color } = placeHolder;

  let propsByTypographyVariant: {
    height: number | string;
    width: number | string;
    type: "text" | "textRow";
    rows: number;
  };

  switch (typographyProps.variant) {
    case "h1": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.h1 as any).fontSize,
        width: 350,
        type: "textRow",
        rows: 1
      };
      break;
    }

    case "h2": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.h2 as any).fontSize,
        width: 300,
        type: "textRow",
        rows: 1
      };
      break;
    }

    case "h3": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.h3 as any).fontSize,
        width: 250,
        type: "textRow",
        rows: 1
      };
      break;
    }

    case "h4": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.h4 as any).fontSize,
        width: 200,
        type: "textRow",
        rows: 1
      };
      break;
    }

    case "h5": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.h5 as any).fontSize,
        width: 200,
        type: "textRow",
        rows: 1
      };
      break;
    }

    // case "h6": {

    // }

    case "body1": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.body1 as any).fontSize,
        width: "100%",
        type: "textRow",
        rows: 4
      };
      break;
    }

    case "body2": {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.body2 as any).fontSize,
        width: "100%",
        type: "textRow",
        rows: 4
      };
      break;
    }

    default: {
      propsByTypographyVariant = {
        height: (TypographyValues.MuiTypography.caption as any).fontSize,
        width: "100%",
        type: "textRow",
        rows: 1
      };
      break;
    }
  }

  return (
    <ReactPlaceholder
      ready={!loading}
      className={typographyProps.className}
      showLoadingAnimation
      type={propsByTypographyVariant.type}
      color={color}
      data-testid="test-react-placeholder"
      style={{
        width: width || propsByTypographyVariant.width,
        height: height || propsByTypographyVariant.height
      }}
      rows={propsByTypographyVariant.rows}
    >
      <Typography {...typographyProps}>{children}</Typography>
    </ReactPlaceholder>
  );
};

interface IWrapperProps extends IProps {
  wrapperClassName?: string;
}

const Text = ({ wrapperClassName, ...restProps }: IWrapperProps) => {
  if (!wrapperClassName) {
    <TextInner {...restProps} />;
  }
  return (
    <div className={wrapperClassName}>
      <TextInner {...restProps} />
    </div>
  );
};

export { Text };
