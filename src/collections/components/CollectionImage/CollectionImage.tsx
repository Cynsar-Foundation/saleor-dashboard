// @ts-strict-ignore
import { Button } from "@dashboard/components/Button";
import CardTitle from "@dashboard/components/CardTitle";
import Hr from "@dashboard/components/Hr";
import ImageUpload from "@dashboard/components/ImageUpload";
import MediaTile from "@dashboard/components/MediaTile";
import Skeleton from "@dashboard/components/Skeleton";
import { CollectionDetailsFragment } from "@dashboard/graphql";
import { commonMessages } from "@dashboard/intl";
import { Card, CardContent, TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import { vars } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    PhotosIcon: {
      height: "64px",
      margin: "0 auto",
      width: "64px",
    },
    PhotosIconContainer: {
      margin: theme.spacing(5, 0),
      textAlign: "center",
    },
    fileField: {
      display: "none",
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%",
    },
    imageContainer: {
      background: "#ffffff",
      border: `1px solid ${vars.colors.border.default1}`,
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      width: 148,
    },
  }),
  {
    name: "CollectionImage",
  },
);

export interface CollectionImageProps {
  data: {
    backgroundImageAlt: string;
  };
  image: CollectionDetailsFragment["backgroundImage"];
  onChange: (event: React.ChangeEvent<any>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

export const CollectionImage: React.FC<CollectionImageProps> = props => {
  const { data, onImageUpload, image, onChange, onImageDelete } = props;

  const anchor = React.useRef<HTMLInputElement>();
  const classes = useStyles(props);
  const intl = useIntl();

  const handleImageUploadButtonClick = () => anchor.current.click();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          id: "DP6b8U",
          defaultMessage: "Background Image (optional)",
          description: "section header",
        })}
        toolbar={
          <>
            <Button variant="tertiary" onClick={handleImageUploadButtonClick}>
              <FormattedMessage {...commonMessages.uploadImage} />
            </Button>
            <input
              className={classes.fileField}
              id="fileUpload"
              onChange={event => onImageUpload(event.target.files[0])}
              type="file"
              ref={anchor}
              accept="image/*"
            />
          </>
        }
      />
      {image === undefined ? (
        <CardContent>
          <div>
            <div className={classes.imageContainer}>
              <Skeleton />
            </div>
          </div>
        </CardContent>
      ) : image === null ? (
        <ImageUpload onImageUpload={files => onImageUpload(files[0])} />
      ) : (
        <CardContent>
          <MediaTile media={image} onDelete={onImageDelete} />
        </CardContent>
      )}
      {image && (
        <>
          <Hr />
          <CardContent>
            <TextField
              name="backgroundImageAlt"
              label={intl.formatMessage(commonMessages.description)}
              helperText={intl.formatMessage({
                id: "0iMYc+",
                defaultMessage: "(Optional)",
                description: "field is optional",
              })}
              value={data.backgroundImageAlt}
              onChange={onChange}
              fullWidth
              multiline
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

CollectionImage.displayName = "CollectionImage";
export default CollectionImage;
