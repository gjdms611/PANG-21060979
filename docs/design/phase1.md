# Phase 1 설계 — 메인 화면 (타이틀 + 메뉴)

> 대상: [docs/PLAN.md](../PLAN.md) Phase 1
> 참고 기획: [docs/FEATURES/main.md](../FEATURES/main.md)

## 1. 범위 확인

**이번 Phase에서 만드는 것**
- 앱 실행 시 가장 먼저 보이는 메인 화면
- 메뉴 4개: `게임 시작`, `조작 방법`, `설정`, `게임 종료`
- 방향키/마우스로 메뉴 이동 + 선택 하이라이트
- `게임 시작` → 임시 화면(placeholder)으로 전환
- `게임 종료` → 종료 확인/안내 표시
- `조작 방법`, `설정` → 클릭 시 임시 안내 문구만 표시 (실제 화면은 Phase 13에서 연결)

**이번 Phase에서 만들지 않는 것 (다음 Phase 이후)**
- 실제 Mission 1 플레이 화면 (Phase 2~)
- `조작 방법` 상세 안내 화면, `설정` 화면의 실제 옵션 (Phase 13)
- 사운드, 배경 애니메이션 등 비주얼 폴리싱 (Phase 16)

---

## 2. `게임 종료` 동작 방식 — 확인 필요

브라우저 환경에서는 `window.close()`가 **스크립트로 직접 연 창이 아니면 대부분 브라우저에서 동작하지 않는다.**
즉, 사용자가 주소창에 URL을 입력해 연 일반 탭에서는 JS로 탭을 강제로 닫을 수 없다.

이번 Phase에서는 아래 방식으로 구현할 예정:
- `게임 종료` 선택 시 확인 모달을 띄우고, "예"를 누르면 `window.close()`를 시도
- 대부분의 환경(일반 브라우저 탭)에서는 닫히지 않으므로, 모달에 "이 창은 직접 닫아주세요" 같은 안내 문구를 함께 표시
- 즉, 실제 "종료" 자체보다는 **종료 확인 UX 흐름**을 검증하는 것이 이번 Phase의 목적

→ 이 부분이 기대와 다르면 (예: 실제로 창을 닫아야 한다 / 별도 안내 없이 조용히 처리 등) 검토 시 알려주세요.

---

## 3. 화면 / 상태 설계

라우팅 라이브러리는 아직 도입하지 않고, `App` 내부 상태로 화면을 전환한다 (Phase 수가 많고 화면도 몇 개 안 되므로 최소 구성 유지, 필요 시 이후 Phase에서 라우터 도입 검토).

```
App
 └─ screen: 'main' | 'mission1-placeholder'   (useState)
     ├─ 'main'                → <MainScreen />
     └─ 'mission1-placeholder' → <Mission1Placeholder />
```

### MainScreen 내부 상태
- `selectedIndex: number` — 현재 하이라이트된 메뉴 인덱스 (0~3)
- `notice: string | null` — `조작 방법` / `설정` 클릭 시 보여줄 임시 안내 문구
- `showExitConfirm: boolean` — 종료 확인 모달 표시 여부

### 메뉴 데이터
```ts
type MenuItem = {
  id: 'start' | 'howToPlay' | 'options' | 'exit'
  label: string
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'start', label: '게임 시작' },
  { id: 'howToPlay', label: '조작 방법' },
  { id: 'options', label: '설정' },
  { id: 'exit', label: '게임 종료' },
]
```

---

## 4. 컴포넌트 / 파일 구조

```
src/
├── App.tsx                        # screen 상태 관리, MainScreen / Mission1Placeholder 렌더 분기
├── screens/
│   ├── MainScreen.tsx              # 타이틀 + 메뉴 + 안내/종료 모달 조합
│   ├── MainScreen.css
│   └── Mission1Placeholder.tsx     # "Mission 1로 이동합니다" 임시 화면
├── components/
│   ├── MenuList.tsx                # 메뉴 목록 렌더링 + 키보드/마우스 인터랙션
│   ├── MenuList.css
│   ├── NoticeModal.tsx             # 조작 방법/설정 클릭 시 안내 문구 모달 (공용)
│   └── ConfirmModal.tsx            # 게임 종료 확인 모달 (공용)
└── constants/
    └── menu.ts                     # MENU_ITEMS 정의
```

역할 분리 기준:
- `MenuList`는 "메뉴를 어떻게 이동/선택하는지"만 책임 (재사용 가능하도록 순수하게 목록 + 콜백)
- `MainScreen`은 메뉴 선택 결과에 따라 무엇을 할지(화면 전환, 모달 표시)를 결정
- `NoticeModal` / `ConfirmModal`은 이후 Phase(설정 화면, 게임 오버 확인 등)에서도 재사용 가능하도록 범용 모달로 분리

---

## 5. 인터랙션 설계

### 키보드
- `MenuList`에 `keydown` 이벤트 리스너 등록 (`window` 대상, 컴포넌트 마운트 시 등록 / 언마운트 시 해제)
- `↓` / `↑` : `selectedIndex`를 0~3 범위에서 순환 이동 (맨 아래에서 ↓ 누르면 다시 0으로, 그 반대도 순환)
- `Enter` : 현재 `selectedIndex`에 해당하는 메뉴 선택 실행
- 모달이 열려 있는 동안(`showExitConfirm`, `notice`)에는 메뉴 이동 키 입력을 무시하고, 모달 자체의 키 처리(예: `Enter`=확인, `Esc`=취소)만 동작

### 마우스
- 각 메뉴 항목에 `onMouseEnter` → 해당 항목을 `selectedIndex`로 설정 (하이라이트)
- `onClick` → 해당 메뉴 선택 실행 (키보드 `Enter`와 동일한 처리 함수 재사용)

### 메뉴 선택 실행 시 동작
| 메뉴 | 동작 |
|---|---|
| 게임 시작 | `App`의 `screen`을 `'mission1-placeholder'`로 변경 |
| 조작 방법 | `notice`에 "조작 방법 화면은 준비 중입니다" 설정 → `NoticeModal` 표시 |
| 설정 | `notice`에 "설정 화면은 준비 중입니다" 설정 → `NoticeModal` 표시 |
| 게임 종료 | `showExitConfirm`을 `true`로 변경 → `ConfirmModal` 표시 |

---

## 6. 스타일 방침

- 컴포넌트 단위 CSS 파일(`MainScreen.css`, `MenuList.css`)로 분리, 기존 `App.css`/`index.css` 방식과 동일하게 일반 CSS 사용 (별도 CSS-in-JS/모듈 라이브러리 도입 없음)
- 선택된 메뉴 항목은 클래스(`.menu-item.selected`)로 구분하여 배경색/텍스트 강조
- 배경 이미지/애니메이션 등 비주얼 요소는 이번 Phase에서 제외 (단색 배경 또는 최소한의 레이아웃만 구성) — Phase 16에서 테마 적용

---

## 7. 확인 방법 (구현 후 테스트)

1. `npm run dev` 실행 후 브라우저에서 접속
2. 방향키 ↑/↓로 메뉴 4개를 순환 이동, 하이라이트가 잘 보이는지 확인
3. 마우스로 메뉴 위에 올렸을 때도 동일하게 하이라이트되는지 확인
4. `게임 시작` 선택(Enter/클릭) → placeholder 화면으로 전환되는지 확인
5. `조작 방법`, `설정` 선택 → 안내 모달이 뜨는지 확인
6. `게임 종료` 선택 → 확인 모달이 뜨는지, "예"를 눌렀을 때 (환경에 따라 닫히지 않더라도) 안내 문구가 보이는지 확인

---

## 8. 검토 요청 사항

- 3번 항목(`게임 종료` 동작 방식)에 대한 승인 여부
- 화면 전환을 위해 라우터 라이브러리(react-router 등) 없이 `useState` 기반으로 진행하는 방향에 대한 동의 여부
- 컴포넌트/파일 구조(섹션 4)에 대한 이견 여부
