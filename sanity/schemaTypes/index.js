import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {blog} from './blog'
import {authorType} from './authorType'
import {portofolioType} from './portofolio'
import { workexperience } from './workexperience'
import { education } from './education'
import { services } from './services'
import {skill} from './skills'
import { project } from './project'

export const schema = {
  types: [
    blockContentType
    , categoryType
    , blog
    , authorType
    , portofolioType
    , workexperience
    , education
    , services
    , skill
    , project
  ],
}
