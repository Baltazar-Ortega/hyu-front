import { makeStyles, Typography, Container } from "@material-ui/core";
import React from "react";
import { ListaBlogposts } from "../components/Blog/ListaBlogposts";
import { Layout } from "../components/Layout";
import { blogApi } from "../utils/contentfulApi";

const useStyles = makeStyles((theme) => ({
  container: {
    // minHeight: "70vh",
    // marginBottom: "50px",
    marginTop: "40px",
  },
  titleBlog: {
    marginBottom: "70px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanBlog: {
    borderBottom: "2px solid #56C62C",
  },
}));

export default function BlogPage({ blogposts }) {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          color="secondary"
          className={classes.titleBlog}
        >
          <span className={classes.spanBlog}>Blog</span>
        </Typography>
      </Container>
      <ListaBlogposts blogposts={blogposts} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const api = new blogApi();
  const blogposts = await api.fetchBlogEntries();

  return {
    props: {
      blogposts,
    },
  };
}
