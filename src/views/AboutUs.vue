<template>
    <div class="cover">
        <div class="container">
            <h1 class="title">About us</h1>
        </div>
    </div>
    <div class="about">
        <div class="container">
            <div class="content-wrap">
                <div class="wrap">
                    <div class="subtitle">
                        <div class="item">01</div>
                        <div class="title">味覺的藝術</div>
                    </div>
                    <div class="content-a">
                        <p>歡迎來到oh~~賣蔬果店，一個源自對「うまい」（美味）的追求，致力於提供天然且手工製作的飲料和醃漬品的特色商店。從濃郁的手工啤酒、獨特的精釀咖啡到香醇的茶飲，再到自家製的醃黃瓜、橄欖及泡菜，每一樣產品都是對傳統與創新的完美結合。</p>
                        <div class="image-a">
                            <img src="../../public/image/about_cover.png" alt="image">
                        </div>
                    </div>
                </div>
                <div class="wrap">
                    <div class="subtitle">
                        <div class="item">02</div>
                        <div class="title">產品理念</div>
                    </div>
                    <div class="content-b">
                        <div class="image-b">
                            <img src="../../public/image/aida_91214_In_a_fresh_fruit_and_vegetable_store_full_of_Japan_700676d4-3be4-4085-9d46-c61558c04663_1.png" alt="image">
                        </div>
                        <div class="paragraph-wrap">
                            <div class="paragraph">
                                <p>「天然、手工、無添加」是我們的製作座右銘。在oh~~賣蔬果店，我們使用來自可持續農業的最佳原材料，每一批產品都經過我們專業團隊的精心製作和嚴格品控，確保送到您手中的每一件商品都能帶來最自然、最健康的美食體驗。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrap">
                    <div class="subtitle">
                        <div class="item">03</div>
                        <div class="title">使命與承諾</div>
                    </div>
                    <div class="content-c">
                        <div class="image-c">
                            <img src="../../public/image/aida_91214_Potato_stew_is_placed_in_a_ceramic_pot._You_can_se_c690be46-6e00-47a8-aa80-ca5352a07c63_0.png" alt="image">
                        </div>
                        <div class="paragraph-wrap">
                            <div class="paragraph">
                                <p>「我們的使命是將健康與美味融入每個家庭的日常生活。oh~~賣蔬果店不僅是一個購物的地點，更是一個讓人們了解食材來源、探索美食製作過程的平台。我們承諾，透過我們的產品，讓每一位顧客都能感受到「うまい」的真諦。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrap">
                    <div class="subtitle">
                        <div class="item">04</div>
                        <div class="title">您的健康伴侶</div>
                    </div>
                    <div class="content-b">
                        <div class="image-b">
                            <img src="../../public/image/monden_family.png" alt="image">
                        </div>
                        <div class="paragraph-wrap">
                            <div class="paragraph">
                                <p>無論您是對健康生活充滿熱情的運動愛好者，還是尋求高品質家庭飲食的家庭主婦，oh~~賣蔬果店都為您提供一個信賴的選擇。加入我們，一起享受健康、自然、美味的生活。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    let mm

    const gsapSet = () => {
      mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const classNames = ['.subtitle', '.content-a', '.content-b', '.content-c']

        classNames.forEach(className => {
          const elements = gsap.utils.toArray(className)
          elements.forEach((element) => {
            const animationProps = { opacity: 0 }
            const finalProps = { opacity: 1, duration: 2, ease: 'power2.out' }

            if (className === '.subtitle') {
              animationProps.y = -100
              finalProps.y = 30
            } else {
              animationProps.y = -100
              finalProps.y = 30
            }
            gsap.fromTo(element,
              animationProps,
              {
                ...finalProps,
                scrollTrigger: {
                  trigger: element,
                  start: 'top 20%',
                  end: 'bottom 80%',
                  toggleActions: 'play none none none',
                  markers: true
                }
              }
            )
          })
        })
      })
    }

    onMounted(() => {
      gsapSet()
    })

    onUnmounted(() => {
      if (mm) mm.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ScrollTrigger.clearMatchMedia()
    })
  }
}
</script>
