import HomePageContainer from "../../components/HomePageContainer/HomePageContainer";
import HeroSection from "../../components/HeroSection/HeroSection";
import TrackerSection from "../../components/TrackerSection/TrackerSection";
import { useEffect } from "react";
import { getDailyWater, getMonthlyWater } from "../../redux/water/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthHeaderSet } from "../../redux/auth/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const isAuthHeaderSet = useSelector(selectIsAuthHeaderSet);

  useEffect(() => {
    if (isAuthHeaderSet) {
      dispatch(getDailyWater());
      dispatch(getMonthlyWater());
    }
  }, [dispatch, isAuthHeaderSet]);

  return (
    <HomePageContainer>
      <HeroSection />
      <TrackerSection />
    </HomePageContainer>
  );
}
