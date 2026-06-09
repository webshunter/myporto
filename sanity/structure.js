import {
  BasketIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  HomeIcon,
  TagIcon,
  ThListIcon,
  UserIcon,
} from '@sanity/icons'
import {PORTFOLIO_DOCUMENT_ID} from './constants'

const HIDDEN_TYPES = [
  'blog',
  'category',
  'author',
  'portofolio',
  'workexperience',
  'education',
  'services',
  'skills',
  'project',
  'app',
  'transaction',
]

const portfolioSingleton = (S) =>
  S.listItem()
    .title('Profile & Contact')
    .icon(UserIcon)
    .child(
      S.document()
        .schemaType('portofolio')
        .documentId(PORTFOLIO_DOCUMENT_ID)
        .title('Profile & Contact')
    )

export const structure = (S) =>
  S.list()
    .title('MyPorto CMS')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Homepage')
            .items([
              portfolioSingleton(S),
              S.divider(),
              S.documentTypeListItem('workexperience')
                .title('Work Experience')
                .icon(CaseIcon),
              S.documentTypeListItem('education')
                .title('Education')
                .icon(BookIcon),
              S.documentTypeListItem('services')
                .title('Services')
                .icon(CogIcon),
              S.documentTypeListItem('skills')
                .title('Skills')
                .icon(ThListIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Blog')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('blog').title('Blog Posts'),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
              S.documentTypeListItem('author').title('Authors').icon(UserIcon),
            ])
        ),

      S.divider(),

      S.documentTypeListItem('project')
        .title('Projects')
        .icon(CaseIcon),

      S.divider(),

      S.listItem()
        .title('App Store')
        .icon(BasketIcon)
        .child(
          S.list()
            .title('App Store')
            .items([
              S.documentTypeListItem('app').title('Applications'),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
              S.documentTypeListItem('transaction').title('Transactions'),
            ])
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !HIDDEN_TYPES.includes(item.getId())
      ),
    ])
