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
      // Project Section
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      // App Store Section
      S.listItem()
        .title('App Store')
        .child(
          S.list()
            .title('App Store')
            .items([
              S.documentTypeListItem('app').title('Applications'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('transaction').title('Transactions'),
            ])
        ),
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
          'project',
          'app',
          'transaction',
          'code'
        ].includes(item.getId()),
      ),
    ])
