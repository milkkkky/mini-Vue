const ShapeFlags = {
  element: 0,
  stateful_component: 0,
  text_children: 0,
  array_children: 0,
};
// vnode -> stateful_component ->
// 1、可以设置 修改
// ShapeFlags.stateful_component = 1
// ShapeFlages.array_children = 1

// 2、查找
// if(ShapeFlags.element)
// if(ShapeFlags.stateful_component)

// 不高效 -> 位运算
//  0000
//  0001 -> element
//  0010 -> stateful
//  0100 -> text_children
//  1000 -> array_children

//  1010

//  | (两位都为0，才为0)
//  & (两位都为1，才为1)

// 修改 |
// 查找 &
