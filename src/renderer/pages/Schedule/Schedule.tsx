import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import './Schedule.css';
import '../../App.css';



interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CustomButton = React.memo(
  styled(Button)<ButtonProps>(() => ({
    backgroundColor: 'white',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    margin: '15px',
    color: 'black',
    width: '150px',
    fontSize: '18px',
  })),
);



export default function Schedule() {
  useInactivityRedirect();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [cources, setCources] = React.useState<JSX.Element[][] | null>(null); // Изначально null, так как данные еще не загружены
  const [loading, setLoading] = React.useState(true); // Флаг загрузки

  const HandleChangeCources = React.useCallback(
    (array: Array<Array<string>>) => {
      const cources: JSX.Element[][] = array.map((group) =>
        group.map((element, index) => (
          <motion.div
            key={`${element}-${index}`} // Уникальный ключ
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CustomButton
              variant="contained"
              onClick={() => navigate(`/view?group=${element}`)}
            >
              {element}
            </CustomButton>
          </motion.div>
        )),
      );
      setCources(cources);
      setLoading(false); // Снимаем флаг загрузки после загрузки данных
    },
    [navigate],
  );

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  React.useEffect(() => {
    HandleChangeCources(JSON.parse(localStorage.getItem('groups') ?? '0').list);
  }, [HandleChangeCources]);

  return (
    <Box
      className="absolute-center"
      sx={{
        width: '600px',
        height: '550px',
      }}
    >
      <motion.div
        key="schedule"
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: -500 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '600px',
            height: '550px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ width: '600px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ margin: '15px' }}
              >
                <Tab label="1 курс" {...a11yProps(0)} sx={{ color: 'black' }} />
                <Tab label="2 курс" {...a11yProps(1)} sx={{ color: 'black' }} />
                <Tab label="3 курс" {...a11yProps(2)} sx={{ color: 'black' }} />
                <Tab label="4 курс" {...a11yProps(3)} sx={{ color: 'black' }} />
              </Tabs>
            </motion.div>
          </Box>

          {loading ? (
            <CircularProgress /> // Показываем индикатор загрузки, пока cources еще null
          ) : (
            <>
              <TabPanel value={value} index={0}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}
                >
                  {cources[0]}
                </motion.div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}
                >
                  {cources[1]}
                </motion.div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}
                >
                  {cources[2]}
                </motion.div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}
                >
                  {cources[3]}
                </motion.div>
              </TabPanel>
            </>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}
