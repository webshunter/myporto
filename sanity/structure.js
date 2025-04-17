// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Personal Website')
    .items([
      S.documentTypeListItem('portofolio').title('Portofolio'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'post'
          , 'category'
          , 'author'
          , 'portofolio'
          , 'workexperience'
          , 'education'
          , 'services'
          , 'skill'
          , 'project'
        ]
        .includes(item.getId()),
      ),
    ])
