import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';

import LinkIcon from '@mui/icons-material/Link';
import { Grid, Box, Typography, Button } from '@mui/material';

import { PageEnum } from '@/enums/page.enum';
import { loadCryptos } from '@/shared/api/coins';
import { CryptoList } from '@/widgets/crypto-list/crypto-list';

export const HomeTopCryptos = () => {
  const query = useQuery({
    queryKey: ['loadCryptos'],
    queryFn: loadCryptos,
  });

  return (
    <>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 14,
            mb: 6,
          }}
        >
          <Typography component="h2" variant="h5">
            Top 10 Cryptos In The World
          </Typography>
          <RouterLink
            to={PageEnum.Cryptocurrencies}
            style={{
              // color: 'white',
              textDecoration: 'none',
            }}
          >
            <Button variant="outlined" color="primary" endIcon={<LinkIcon />}>
              More
            </Button>
          </RouterLink>
        </Box>
      </Grid>
      <CryptoList
        coins={query.data?.coins || []}
        isFetching={query.isLoading}
      />
    </>
  );
};
