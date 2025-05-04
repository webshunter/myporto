// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Personal Website')
    .items([
      // Blog Section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('blog').title('Blog Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      S.divider(),
      // Portfolio Section
      S.documentTypeListItem('portofolio').title('Portfolio'),
      S.divider(),
      // Other Content
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'blog',
          'category',
          'author',
          'portofolio',
          'workexperience',
          'education',
          'services',
          'skill',
          'project'
        ].includes(item.getId()),
      ),
    ])
