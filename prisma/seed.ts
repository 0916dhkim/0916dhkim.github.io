import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: "Lorem Ipsum at Its Finest",
        language: "EN",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis mauris elementum, eleifend velit id, faucibus dui. Sed molestie nunc nec lacus commodo, vel elementum tortor faucibus. Duis efficitur vulputate ullamcorper. Vivamus ullamcorper dolor ut sapien eleifend feugiat. Suspendisse id fringilla mauris. Sed luctus enim tempor condimentum faucibus. Nullam mollis consectetur tempor. Cras pharetra velit eget erat suscipit tincidunt. Aliquam mattis placerat rutrum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Aenean eget est et augue facilisis interdum. Cras lacinia eu sapien porta fringilla. Sed nunc tellus, elementum ac nulla quis, luctus mollis ligula. Aenean vitae blandit libero. Maecenas facilisis congue nulla sit amet rutrum. Suspendisse placerat magna nec nulla gravida, sed consectetur ante mollis. Nullam bibendum nunc ac euismod lacinia. Ut ultrices aliquam mi nec posuere. Vestibulum at lorem vitae dolor finibus consequat. Donec eu condimentum turpis. Praesent pellentesque tortor a orci tristique, ac ullamcorper ex malesuada. Proin lacinia felis eget blandit vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in magna sagittis, sagittis velit in, mollis elit. Quisque at purus non nisi mollis scelerisque pharetra quis justo. Curabitur neque leo, volutpat eu lorem id, consectetur fringilla odio.

Donec mattis pulvinar fringilla. Curabitur laoreet, ligula id tristique dapibus, libero risus porttitor velit, id laoreet eros arcu at libero. Vivamus vehicula, nulla elementum pulvinar convallis, urna erat fringilla sem, nec pharetra leo lacus ac urna. Donec vestibulum maximus ex, sed accumsan dolor fringilla id. Morbi dictum suscipit sollicitudin. Morbi tristique lobortis velit, vitae facilisis justo faucibus ac. Etiam sed velit vulputate, dapibus tellus vel, pulvinar tortor. Sed in pellentesque mauris. Praesent rhoncus massa a felis finibus consectetur sed eu odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum cursus venenatis interdum. Fusce nec magna dignissim, gravida dolor et, consectetur massa. Nulla tristique pretium ligula. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Cras tempus justo non nulla hendrerit ultrices. Aliquam condimentum magna id dui accumsan, a consectetur tortor tempus. Duis vehicula, sapien ornare efficitur euismod, eros tellus vulputate dolor, et dictum tortor tellus eu massa. Maecenas sagittis sapien quis arcu sodales, id dictum orci interdum. Sed eget lacus nisl. In hac habitasse platea dictumst. Fusce finibus quis erat ut varius. Sed ac tortor eu nunc tempus suscipit. Phasellus rutrum nibh a iaculis tincidunt. Duis tincidunt sed lectus ac commodo. Nunc feugiat blandit nunc, nec vulputate lectus sagittis sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Praesent feugiat velit sit amet est laoreet, quis lacinia nibh gravida. Praesent blandit arcu erat. Cras in lobortis arcu, nec tincidunt mi. Aliquam metus odio, sollicitudin ut placerat a, vestibulum eget diam. Aenean porta hendrerit hendrerit. Donec ut lobortis lectus. Sed at consectetur nunc, in faucibus dui. Nulla facilisis felis eu diam tempus euismod. Phasellus aliquet sit amet sem in fringilla. Vivamus sit amet leo in augue sagittis viverra. Nunc lobortis eu tortor vitae ullamcorper. Maecenas aliquet eros ut felis condimentum fermentum. Praesent quis gravida elit. Phasellus nec faucibus arcu.
`,
      },
      {
        title: "Markdown Sampler",
        language: "EN",
        content: `# H1 Biggest
## H2 Big
### H3 Small
#### H4 Smallest

#### List
- First
- Second
- Third

#### Blockquote
> That's what she said.

#### Code
Inline \`code\` embedded.

pre + code:
\`\`\`python
sum = 1 + 2
def add(a, b):
  return a + b
\`\`\`

**BOLD** & _italic_ words.

---

horizontal rules

---

My [link](https://google.com)`,
      },
      {
        title: "한글 포스트",
        language: "KR",
        content: `# 별 헤는 밤
계절이 지나가는 하늘에는
가을로 가득 차 있습니다.

나는 아무 걱정도 없이
가을 속의 별들을 다 헤일 듯합니다.

가슴 속에 하나 둘 새겨지는 별을
이제 다 못 헤는 것은
쉬이 아침이 오는 까닭이요,
내일 밤이 남은 까닭이요,
아직 나의 청춘이 다하지 않은 까닭입니다.`,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
