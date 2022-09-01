import { createClient } from "contentful";

import moment from "moment";

export class blogApi {
  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  async fetchBlogEntries() {
    return await this.client
      .getEntries({
        content_type: "blogPost",
      })
      .then((entries) => {
        // console.log("Entries: ", entries);
        if (entries && entries.items && entries.items.length > 0) {
          const blogPosts = entries.items.map((entry) =>
            this.convertPost(entry)
          );
          return blogPosts;
        }
        return [];
      });
  }

  async fetchBlogSlugs() {
    return await this.client
      .getEntries({
        content_type: "blogPost",
      })
      .then((entries) => {
        if (entries && entries.items && entries.items.length > 0) {
          const slugs = entries.items.map((entry) => entry.fields.slug);
          return slugs;
        }
        return [];
      });
  }

  async fetchBlogpostBySlug(slug) {
    return await this.client
      .getEntries({
        content_type: "blogPost",
        "fields.slug": slug,
      })
      .then((entries) => {
        if (entries && entries.items && entries.items.length > 0) {
          const blogPosts = entries.items.map((entry) =>
            this.convertPost(entry)
          );
          return blogPosts[0];
        }
        return null;
      })
      .catch((err) => {
        console.log("Error: ", err.details.errors);
      });
  }

  async fetchBlogpostById(id) {
    return await this.client.getEntry(id).then((entry) => {
      if (entry) {
        const post = this.convertPost(entry);
        return post;
      }
      return null;
    });
  }

  convertPost(rawData) {
    const rawPost = rawData.fields;
    // console.log("rawPost: ", rawPost.informacion)
    const rawHeroImage = rawPost.imagenPrincipal
      ? rawPost.imagenPrincipal.fields
      : null;
    const rawAuthor = rawPost.autor ? rawPost.autor.fields : null;
    return {
      id: rawData.sys.id,
      titulo: rawPost.titulo,
      slug: rawPost.slug,
      imagenPrincipal: this.convertImage(rawHeroImage),
      introduccion: rawPost.introduccion,
      informacion: rawPost.informacion,
      autor: this.convertAuthor(rawAuthor),
      fechaPublicacion: moment(rawPost.fechaPublicacion).format("DD MMM YYYY"),
      palabrasClave: rawPost.palabrasClave,
    };
  }

  convertImage(rawImage) {
    if (rawImage) {
      return {
        imageUrl: rawImage.file.url.replace("//", "http://"), // may need to put null check as well here
      };
    }
    return null;
  }

  convertAuthor(rawAuthor) {
    if (rawAuthor) {
      return {
        name: rawAuthor.name,
        shortBio: rawAuthor.shortBio,
        title: rawAuthor.title,
        email: rawAuthor.email,
        company: rawAuthor.company,
      };
    }
    return null;
  }
}
